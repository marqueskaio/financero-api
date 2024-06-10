import { type NextFunction, type Request, type Response } from 'express'
import {Middleware} from "../../interfaces/protocols/middleware";
import {HttpRequest} from "../../interfaces/http/http-request";
import app from "../config/app";

export const adaptMiddleware = (middleware: Middleware) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "http://localhost:8081"); // ou "*" para permitir qualquer origem
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });

    const httpRequest: HttpRequest = {
      headers: req.headers
    }
    const httpResponse = await middleware.handle(httpRequest)
    if (httpResponse.statusCode === 200) {
      Object.assign(req, httpResponse.body)
      next()
    } else {
      res.status(httpResponse.statusCode).json({
        error: httpResponse.body.message
      })
    }
  }
}
