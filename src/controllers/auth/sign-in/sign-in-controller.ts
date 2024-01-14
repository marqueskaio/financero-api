import {Controller} from "../../../interfaces/controllers/Controller";
import {HttpRequest} from "../../../interfaces/http/http-request";
import {ok, serverError, unauthorized} from "../../../helpers/http/http-helper";
import {SignInUsecaseInterface} from "../../../interfaces/usecases/sign-in-usecase-interface";
import {EncrypterAdapterInterface} from "../../../interfaces/adapter/encrypter-adapter-interface";
import {UserRepositoryInterface} from "../../../interfaces/repositories/user/user-repository-interface";
import {HashComparerAdapterInterface} from "../../../interfaces/adapter/hash-comparer-adapter-interface";

export class SignInController implements Controller {
  constructor(
    private readonly signInUsecase: SignInUsecaseInterface,
    private readonly encrypter: EncrypterAdapterInterface,
    private readonly userRepository: UserRepositoryInterface,
    private readonly hasher: HashComparerAdapterInterface,
  ) {
  }

  async handle(httpRequest: HttpRequest): Promise<any> {
    try {
      const {email, password} = httpRequest.body
      const result = await this.userRepository.findByEmail(email)
      if (!result || result.role !== 'admin') {
        return unauthorized()
      }
      const isValid = await this.hasher.compare(password, result.password)
      if (!isValid) {
        return unauthorized()
      }
      const accessToken = await this.encrypter.encrypt(result.id.toString())
      const user = await this.userRepository.updateAccessToken(result.id, accessToken)
      return ok(user)
    } catch (e: any) {
      return serverError(e)
    }
  }
}