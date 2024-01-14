import {UsersModel} from "@prisma/client";

export interface FindUserByIdInterface {
  findById: (id: number) => Promise<UsersModel | null>
}