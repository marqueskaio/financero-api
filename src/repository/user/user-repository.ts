import {UserRepositoryInterface} from "../../interfaces/repositories/user/user-repository-interface";
import {UsersModel} from "@prisma/client";
import DB from "../../databases";
import {SignInParamsInterface} from "../../interfaces/data/sign-in-interface";
import {LoadAccountByTokenRepository} from "../../interfaces/repositories/user/load-user-by-token-interface";
import {LoadAllUsersInterface} from "../../interfaces/repositories/user/load-all-users-interface";
import {FindUserByIdInterface} from "../../interfaces/repositories/user/find-user-by-id-interface";

export class UserRepository implements UserRepositoryInterface, LoadAccountByTokenRepository, LoadAllUsersInterface, FindUserByIdInterface {
  async save(data: Omit<UsersModel, 'id'>): Promise<UsersModel | null> {
    return DB.usersModel.create({data: data})
  }

  async findByEmail(email: string): Promise<UsersModel | null> {
    return DB.usersModel.findFirst({where: {email}})
  }

  async authenticate(credential: SignInParamsInterface): Promise<UsersModel | null> {
    return DB.usersModel.findFirst({
      where: {
        password: credential.password,
        email: credential.email
      }
    })
  }

  async updateAccessToken(userId: number, accessToken: string): Promise<UsersModel> {
    return DB.usersModel.update({
      where: {
        id: userId,
      },
      data: {
        accessToken: accessToken,
      },
    })
  }

  async loadByToken(token: string): Promise<UsersModel | null> {

    return DB.usersModel.findFirst({where: {accessToken: token}});
  }

  async getAll(): Promise<UsersModel[] | []> {
    return DB.usersModel.findMany()
  }

  async findById(id: number): Promise<UsersModel | null> {
    return DB.usersModel.findFirst({where: {id: id}})
  }

}