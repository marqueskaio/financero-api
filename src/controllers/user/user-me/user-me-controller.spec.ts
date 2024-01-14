import {UserMeController} from "./user-me-controller";
import {UsecaseInterface} from "../../../interfaces/usecases/usecase-interface";
import {mockModelUser} from "../../../tests/factories/user-model-factory";
import {ok, serverError} from "../../../helpers/http/http-helper";
import {throwException} from "../../../tests/helpers/throw-exception";

const mockFindUserByIdStub = (): UsecaseInterface => {
  class FindUserByIdStub implements UsecaseInterface {
    execute(): Promise<any> {
      return Promise.resolve(mockModelUser());
    }
  }
  return new FindUserByIdStub()
}
type SutTypes = {
  sut: UserMeController
  findUserByIdStub: UsecaseInterface
}
const makeSut = (): SutTypes => {
  const findUserByIdStub = mockFindUserByIdStub()
  const sut = new UserMeController(findUserByIdStub)
  return {
    sut,
    findUserByIdStub
  }
}

describe('UserMeController', () => {
  test('ensure UserMeController calls usecase with correct values', async() => {
    const {sut, findUserByIdStub} = makeSut()
    const spy = jest.spyOn(findUserByIdStub, 'execute')
    await sut.handle({accountId: 1})
    expect(spy).toHaveBeenCalledWith(1)
  })
  test('ensure UserMeController return user on success', async() => {
    const {sut} = makeSut()
    const user = await sut.handle({accountId: 1})
    expect(user).toEqual(ok(mockModelUser()))
  })
  test('ensure UserMeController return serverError if findUserById fails', async() => {
    const {sut, findUserByIdStub} = makeSut()
    jest.spyOn(findUserByIdStub, 'execute').mockImplementationOnce(throwException)
    const error = await sut.handle({accountId: 1})
    expect(error).toEqual(serverError(new Error()))
  })
})