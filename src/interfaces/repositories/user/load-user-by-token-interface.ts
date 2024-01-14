import {UsersModel} from "@prisma/client";

export interface LoadAccountByTokenRepository {
  loadByToken: (token: string) => Promise<UsersModel | null>
}
