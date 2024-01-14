import {HttpRequest} from "../http/http-request";
import {HttpResponse} from "../http/http-response";

export interface Middleware {
  handle: (httpRequest: HttpRequest) => Promise<HttpResponse>
}
