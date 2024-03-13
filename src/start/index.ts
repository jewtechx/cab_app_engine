"use strict";

import { Config } from "../config";
import express from "express";
import { IAppContext } from "../types/app";
import cors from "cors";
import { json } from "body-parser";

import initDb from "../models";
import initServices from "../services";
import log from "../utils/log";
import router from "../routes/auth/auth.router";

export default async function start(config: Config) {
  try {
    // setting global context
    const appContext: IAppContext = {};

    // initialize models
    appContext.models = await initDb(config.db)
    appContext.services = await initServices(appContext)

    // initialize app
    const app = express();
    app.use(express.urlencoded({ extended: true }));

    
        app.use(
          cors<cors.CorsRequest>(),
          json(),
        );

    //server health check
    app.use("/healthcheck", (_, res) => {
      res.status(200).send("All is green!!!");
    });

    //router
    const route = router(appContext)
    app.use(route)

    app.listen(config.app.port, () => {
      log.info(
        `Server ready at http://localhost:${config.app.port}`
      );
    }); 
  } catch (err) {
    console.error(err);
  }
}