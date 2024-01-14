import {UserRepositoryInterface} from "../../../interfaces/repositories/user/user-repository-interface";
import {UsersModel} from "@prisma/client";
import {SignInParamsInterface} from "../../../interfaces/data/sign-in-interface";
import {SignInUsecaseInterface} from "../../../interfaces/usecases/sign-in-usecase-interface";
import {HasherAdapterInterface} from "../../../interfaces/adapter/hash-adapter-interface";

export class SignInAdminUsecase implements SignInUsecaseInterface {
  constructor(
    private readonly userRepository: UserRepositoryInterface,
    private readonly bcrypt: HasherAdapterInterface
  ) {
  }

  async execute(data: SignInParamsInterface): Promise<UsersModel | null> {
    const passwordHashed = await this.bcrypt.hash(data.password)
    return await this.userRepository.authenticate({email: data.email, password: passwordHashed})
  }
}