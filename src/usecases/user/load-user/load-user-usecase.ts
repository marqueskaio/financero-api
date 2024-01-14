import {LoadUserUsecaseInterface} from "../../../interfaces/usecases/load-user-usecase-interface";
import {UsersModel} from "@prisma/client";
import {LoadAllUsersInterface} from "../../../interfaces/repositories/user/load-all-users-interface";

export class LoadUserUsecase implements LoadUserUsecaseInterface {
  constructor(private readonly userRepository: LoadAllUsersInterface) {
  }
  async getAll(): Promise<UsersModel[] | []> {
    return await this.userRepository.getAll()

  }

}