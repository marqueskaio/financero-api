import {UsecaseInterface} from "../../interfaces/usecases/usecase-interface";
import {mockModelUser} from "../factories/user-model-factory";

export const mockUserCreateUsecase = (): UsecaseInterface => {
  class CreateUserUsecaseStub implements UsecaseInterface {
    execute(): Promise<any> {
      return Promise.resolve(mockModelUser());
    }
  }
  return new CreateUserUsecaseStub()
}