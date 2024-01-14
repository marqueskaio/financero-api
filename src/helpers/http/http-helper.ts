import {HttpResponse} from "../../interfaces/http/http-response";
import {UnauthorizedError} from "../errors/unauthorized-error";
import {ServerError} from "../errors/server-error";

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})
export const forbidden = (error: Error): HttpResponse => ({
  statusCode: 403,
  body: error
})

export const unauthorized = (): HttpResponse => ({
  statusCode: 401,
  body: new UnauthorizedError()
})

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(error.stack)
})

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data
})

export const noContent = (): HttpResponse => ({
  statusCode: 204,
  body: null
})
