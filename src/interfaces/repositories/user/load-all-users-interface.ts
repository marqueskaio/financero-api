import {UsersModel} from "@prisma/client";

export interface LoadAllUsersInterface {
  getAll: () => Promise<UsersModel[] | []>
}
