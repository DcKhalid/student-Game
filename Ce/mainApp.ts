import express, { Application, Request, Response } from "express";
import data from "./router/bookRouter";
import { statusCode } from "./utils/statusCode";
export const mainApp = (app: Application) => {
  app.use("/api/v1", data);
  app.get("/", (req: Request, res: Response) => {
    try {
      res.status(statusCode.OK).json({
        message: "Welcome to our foodstuff libary",
      });
    } catch (error) {
      res.status(statusCode.BAD_REQUEST).json({
        message: "Error",
      });
    }
  });
};
