import {UsersModel} from "@prisma/client";

export interface LoadUserUsecaseInterface {
  getAll: () => Promise<UsersModel[] | []>
}