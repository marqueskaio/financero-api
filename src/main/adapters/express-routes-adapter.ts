import { type Request, type Response } from 'express'
import {Controller} from "../../interfaces/controllers/Controller";
import {HttpRequest} from "../../interfaces/http/http-request";
import DB from "../../databases";

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    let user = null
    if(req.accountId) {
      user = await DB.usersModel.findFirst({where: {id: parseInt(req.accountId + '')}})
    }
    const httpRequest: HttpRequest = {
      body: req.body,
      params: req.params,
      accountId: req.accountId,
      user: user
    }
    const httpResponse = await controller.handle(httpRequest)
    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      res.status(httpResponse.statusCode).json(httpResponse.body)
    } else {
      res.status(httpResponse.statusCode).json({
        error: httpResponse.body.message,
        body: httpResponse.body.body,
        stack: httpResponse.body.stack
      })
    }
  }
}
