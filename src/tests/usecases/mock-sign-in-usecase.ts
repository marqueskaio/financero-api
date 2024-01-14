import {mockModelUser} from "../factories/user-model-factory";
import {SignInUsecaseInterface} from "../../interfaces/usecases/sign-in-usecase-interface";
import {UsersModel} from "@prisma/client";

export const mockSignInUsecase = (): SignInUsecaseInterface => {
  class SignInUsecaseStub implements SignInUsecaseInterface {
    execute(): Promise<UsersModel | null> {
      return Promise.resolve(mockModelUser());
    }
  }

  return new SignInUsecaseStub()
}