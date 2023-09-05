import { httpLogger, ResponseUtils } from "@v-libs/node-infrastructure";
import express from "express";

import { AppConfig } from "./configs";
import { corsMiddleware, errorHandlerMiddleware } from "./middleware";
import { UserAuthController } from './userAuth/userAuth.controller';

const setupAppMiddlewares = (app: express.Express) => {
    app.use(httpLogger());
    app.use((_, res, next) => {
        Object.assign(res, ResponseUtils(res));
        next();
    });
    app.use(corsMiddleware(AppConfig.HttpServer.CORS));
    app.use(express.json());
    app.use(
        express.urlencoded({extended: true})
    );
}

const initializeControllers = (router: express.Router): void => {
    new UserAuthController(router);
  };
  
  const setupBackgroundAppMiddlewares = (app: express.Express) => {
    app.use(errorHandlerMiddleware);
  };