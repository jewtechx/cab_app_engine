"use strict";

import { Config } from "../config";
import express from "express";
import cors from "cors";
import { json } from "body-parser";

export default async function start(config: Config) {
  try {

    // initialize app
    const app = express();
    app.use(json())
    app.use(cors())
    app.use(express.urlencoded({ extended: true }));

    //server health check
    app.use("/healthcheck", (_, res) => {
      res.status(200).send("All is green!!!");
    });

    app.listen(config.app.port, () => {
      console.log(
        `Server ready at http://localhost:${config.app.port}/graphql`
      );
    }); 
  } catch (err) {
    console.error(err);
  }
}