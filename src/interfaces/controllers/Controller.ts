import {HttpRequest} from "../http/http-request";

export interface Controller {
  handle: (httpRequest: HttpRequest) => any
}