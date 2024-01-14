import {UsersModel} from '@prisma/client'
import {SignInParamsInterface} from "../../data/sign-in-interface";

export interface UserRepositoryInterface {
  save: (data: Omit<UsersModel, 'id'>) => Promise<UsersModel | null>
  findByEmail: (email: string) => Promise<UsersModel | null>
  authenticate: (credential: SignInParamsInterface) => Promise<UsersModel | null>
  updateAccessToken: (userId: number, accessToken: string) => Promise<UsersModel>
}