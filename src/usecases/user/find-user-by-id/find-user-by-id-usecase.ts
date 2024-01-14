import {UsecaseInterface} from "../../../interfaces/usecases/usecase-interface";
import {UsersModel} from "@prisma/client";
import {FindUserByIdInterface} from "../../../interfaces/repositories/user/find-user-by-id-interface";

export class FindUserByIdUsecase implements UsecaseInterface {

  constructor(private readonly repository: FindUserByIdInterface) {}

  async execute(id: number): Promise<UsersModel | null> {
    return await this.repository.findById(id)
  }

}