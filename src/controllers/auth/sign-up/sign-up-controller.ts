import {Controller} from "../../../interfaces/controllers/Controller";
import {HttpRequest} from "../../../interfaces/http/http-request";
import {SignUpUsecaseInterface} from "../../../interfaces/usecases/sign-up-usecase-interface";
import {badRequest, ok, serverError, unauthorized} from "../../../helpers/http/http-helper";
import {EncrypterAdapterInterface} from "../../../interfaces/adapter/encrypter-adapter-interface";
import {UserRepositoryInterface} from "../../../interfaces/repositories/user/user-repository-interface";
import {Validation} from "../../../interfaces/protocols/validation";

export class SignUpController implements Controller {
  constructor(
    private readonly signUpUsecase: SignUpUsecaseInterface,
    private readonly encrypter: EncrypterAdapterInterface,
    private readonly userRepository: UserRepositoryInterface,
    private readonly validation: Validation
  ) {
  }

  async handle(httpRequest: HttpRequest): Promise<any> {
    try {
      const error = await this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const data = {...httpRequest.body, role: httpRequest.params.role}
      const user = await this.signUpUsecase.execute(data)
      if(!user) {
        return unauthorized()
      }
      const accessToken = await this.encrypter.encrypt(user.id.toString())
      const result = await this.userRepository.updateAccessToken(user.id, accessToken)
      return ok(result)
    }catch (e: any) {
      return serverError(e)
    }
  }
}