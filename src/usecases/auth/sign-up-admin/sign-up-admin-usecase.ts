import {SignUpUsecaseInterface} from "../../../interfaces/usecases/sign-up-usecase-interface";
import {UserRepositoryInterface} from "../../../interfaces/repositories/user/user-repository-interface";
import {SignUpParamsInterface} from "../../../interfaces/data/sign-up-interface";
import {UsersModel} from "@prisma/client";
import {HasherAdapterInterface} from "../../../interfaces/adapter/hash-adapter-interface";

export class SignUpAdminUsecase implements SignUpUsecaseInterface {
  constructor(
    private readonly userRepository: UserRepositoryInterface,
    private readonly hasher: HasherAdapterInterface
  ) {
  }

  async execute(data: SignUpParamsInterface): Promise<UsersModel | null> {
    const hasUserWithEmail = await this.userRepository.findByEmail(data.email)
    if (hasUserWithEmail) {
      throw new Error()
    }
    const passwordHashed = await this.hasher.hash(data.password)
    return await this.userRepository.create({...data, password: passwordHashed, role: 'admin', accessToken: ''})
  }

}