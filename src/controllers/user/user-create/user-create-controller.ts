import {Controller} from "../../../interfaces/controllers/Controller";
import {HttpRequest} from "../../../interfaces/http/http-request";
import {UsecaseInterface} from "../../../interfaces/usecases/usecase-interface";
import {badRequest, ok, serverError} from "../../../helpers/http/http-helper";
import {Validation} from "../../../interfaces/protocols/validation";

export class UserCreateController implements Controller {
  constructor(
    private readonly createUserUsecase: UsecaseInterface,
    private readonly validation: Validation
  ) {
  }

  async handle(httpRequest: HttpRequest): Promise<any> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const result = await this.createUserUsecase.execute(httpRequest.body)
      return ok(result)
    }catch (e: any) {
      return serverError(e)
    }
  }

}