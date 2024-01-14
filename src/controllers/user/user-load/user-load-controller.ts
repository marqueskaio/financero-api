import {Controller} from "../../../interfaces/controllers/Controller";
import {ok, serverError} from "../../../helpers/http/http-helper";
import {LoadAllUsersInterface} from "../../../interfaces/repositories/user/load-all-users-interface";

export class UserLoadController implements Controller {
  constructor(private readonly userRepository: LoadAllUsersInterface) {
  }

  async handle(): Promise<any> {
    try {
      const result = await this.userRepository.getAll()
      return ok(result)
    } catch (e: any) {
      return serverError(e)
    }
  }

}