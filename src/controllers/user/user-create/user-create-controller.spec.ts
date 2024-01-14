import {UserCreateController} from "./user-create-controller";
import {mockUserCreateUsecase} from "../../../tests/usecases/mockUserCreateUsecase";
import {UsecaseInterface} from "../../../interfaces/usecases/usecase-interface";
import {mockModelUser} from "../../../tests/factories/user-model-factory";
import {ok, serverError} from "../../../helpers/http/http-helper";
import {throwException} from "../../../tests/helpers/throw-exception";
import {mockValidation} from "../../../tests/factories/mock-validation";

type SutTypes = {
  sut: UserCreateController
  createUserUsecaseStub: UsecaseInterface
}
const makeSut = (): SutTypes => {
  const createUserUsecaseStub = mockUserCreateUsecase()
  const validationStub = mockValidation()
  const sut = new UserCreateController(createUserUsecaseStub, validationStub)
  return {
    sut,
    createUserUsecaseStub
  }
}

describe('UserCreateController', () => {
  test('ensure UserCreateController calls usecase with correct values', async() => {
    const {sut, createUserUsecaseStub} = makeSut()
    const spy = jest.spyOn(createUserUsecaseStub, 'execute')
    await sut.handle({body: mockModelUser()})
    expect(spy).toHaveBeenCalledWith(mockModelUser())
  })
  test('ensure UserCreateController return user on success', async() => {
    const {sut} = makeSut()
    const user = await sut.handle({body: mockModelUser()})
    expect(user).toEqual(ok(mockModelUser()))
  })
  test('ensure UserCreateController return serverError if createUserUsecase fails', async() => {
    const {sut, createUserUsecaseStub} = makeSut()
    jest.spyOn(createUserUsecaseStub, 'execute').mockImplementationOnce(throwException)
    const error = await sut.handle({body: mockModelUser()})
    expect(error).toEqual(serverError(new Error()))
  })
})