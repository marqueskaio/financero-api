import {Controller} from "../../../interfaces/controllers/Controller";
import {HttpRequest} from "../../../interfaces/http/http-request";
import {UsecaseInterface} from "../../../interfaces/usecases/usecase-interface";
import {ok, serverError} from "../../../helpers/http/http-helper";

export class UserMeController implements Controller {
  constructor(
    private readonly findUserById: UsecaseInterface,
  ) {
  }

  async handle(httpRequest: HttpRequest): Promise<any> {
    try {
      const result = await this.findUserById.execute(httpRequest.accountId)
      return ok(result)
    }catch (e: any) {
      return serverError(e)
    }
  }

}