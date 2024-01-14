import {UserRepositoryInterface} from "../../interfaces/repositories/user/user-repository-interface";
import {UsersModel} from "@prisma/client";
import {mockModelUser} from "../factories/user-model-factory";

export const mockUserRepository = (): UserRepositoryInterface => {
  class UserRepositoryStub implements UserRepositoryInterface {
    save(): Promise<UsersModel | null> {
      return Promise.resolve(mockModelUser());
    }

    findByEmail(): Promise<UsersModel | null> {
      return Promise.resolve(null);
    }

    authenticate(): Promise<UsersModel | null> {
      return Promise.resolve(mockModelUser());
    }

    updateAccessToken(): Promise<UsersModel> {
      return Promise.resolve(mockModelUser({accessToken: 'ecrypt_access_token'}));
    }
  }
  return new UserRepositoryStub()
}