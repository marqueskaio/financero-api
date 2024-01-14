import {Middleware} from "../interfaces/protocols/middleware";
import {forbidden, ok, serverError} from "../helpers/http/http-helper";
import {HttpRequest} from "../interfaces/http/http-request";
import {HttpResponse} from "../interfaces/http/http-response";
import {AccessDeniedError} from "../helpers/errors/access-denied-error";
import {LoadAccountByTokenRepository} from "../interfaces/repositories/user/load-user-by-token-interface";

export class AuthMiddleware implements Middleware {
  constructor (
    private readonly loadAccountByToken: LoadAccountByTokenRepository,
    private readonly role?: string
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      await new Promise(resolve => { resolve(null) })
      const accessToken = httpRequest.headers?.['x-access-token']
      if (accessToken) {
        const account = await this.loadAccountByToken.loadByToken(accessToken)
        if (account && account.role === this.role) {
          return ok({ accountId: account.id })
        }
      }
      return forbidden(new AccessDeniedError())
    } catch (e: any) {
      return serverError(e)
    }
  }
}
