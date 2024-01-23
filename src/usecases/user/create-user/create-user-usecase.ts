import {UsecaseInterface} from "../../../interfaces/usecases/usecase-interface";
import {UsersModel} from "@prisma/client";
import {UserRepositoryInterface} from "../../../interfaces/repositories/user/user-repository-interface";

export class CreateUserUsecase implements UsecaseInterface{
  constructor(private readonly userRepository: UserRepositoryInterface) {
  }
  async execute(data: any): Promise<UsersModel | null> {
    const hasUser = await this.userRepository.findByEmail(data.email)
    if(hasUser) {
      throw new Error()
    }
    return await this.userRepository.create(data)
  }

}