"use strict";

import { Config } from "../config";
import express from "express";
import { IAppContext } from "../types/app";
import cors from "cors";
import { json } from "body-parser";
import cookieParser from "cookie-parser"
import multer from 'multer'
import path from 'path';
import initDb from "../models";
import initServices from "../services";
import log from "../utils/log";
import router from "../routes";
import mongoose from "mongoose";
import User from "../models/user/user";

export const appContext: IAppContext = {};
export let uploadAvatar;

export default async function start(config: Config) {
  try {
    // setting global context

    // initialize models
    appContext.models = await initDb(config.db)
    appContext.services = await initServices(appContext)

    // initialize app
    const app = express();
    app.use(express.urlencoded({ extended: true }));

         // cors middleware
        app.use(
          cors<cors.CorsRequest>(),
          json(),
        );

        // cookie middleware
        app.use(cookieParser())

    //server health check
    app.use("/healthcheck", (_, res) => {
      res.status(200).send("All is green!!!");
    });

    //clear database
    app.get('/clearDB',async (_,res) => {
      await User.deleteMany()
      res.status(200).send('database cleared')
    })

    //router
    app.use(router)

    // file uploads
    const avatarStorage = multer.diskStorage({
      destination: path.join(__dirname, '../uploads/avatars'),
      filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
      }
    });
    
    function checkFileType(file, cb) {
      const filetypes = /jpeg|jpg|png/;
      const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
      const mimetype = filetypes.test(file.mimetype);
    
      if (extname && mimetype) {
        return cb(null, true);
      } else {
        cb('Error: Images only! (jpeg, jpg, png)');
      }
    }

    uploadAvatar = multer({
      storage: avatarStorage,
      limits: { fileSize: 10000000 }, // Limit file size to 10MB
      fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
      }
    }).single('avatar');

    app.use(express.static(path.join(__dirname, '..', 'public')));
    app.get('/uploadfile', (req, res) => {
      res.status(200).sendFile(path.join(__dirname, '..', 'public','upload.html'));
    });

    // start app
    app.listen(config.app.port, () => {
      log.info(
        `Server ready at http://localhost:${config.app.port}`
      );
    }); 
  } catch (err) {
    console.error(err);
  }
}