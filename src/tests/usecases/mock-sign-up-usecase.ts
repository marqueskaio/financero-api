import {UsecaseInterface} from "../../interfaces/usecases/usecase-interface";
import {mockModelUser} from "../factories/user-model-factory";
import {SignUpUsecaseInterface} from "../../interfaces/usecases/sign-up-usecase-interface";

export const mockSignUpUsecase = (): SignUpUsecaseInterface => {
  class SignUpUsecase implements SignUpUsecaseInterface {
    execute(): Promise<any> {
      return Promise.resolve(mockModelUser());
    }
  }
  return new SignUpUsecase()
}