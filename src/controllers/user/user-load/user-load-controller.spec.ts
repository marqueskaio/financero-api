import {UserLoadController} from "./user-load-controller";
import {mockModelUser} from "../../../tests/factories/user-model-factory";
import {UsersModel} from "@prisma/client";
import {LoadAllUsersInterface} from "../../../interfaces/repositories/user/load-all-users-interface";
import {ok, serverError} from "../../../helpers/http/http-helper";
import {throwException} from "../../../tests/helpers/throw-exception";

const mockLoadAllUser = (): LoadAllUsersInterface => {
  class LoadAllUsersStub implements LoadAllUsersInterface {
    getAll(): Promise<UsersModel[] | []> {
      return Promise.resolve([mockModelUser()]);
    }
  }
  return new LoadAllUsersStub()
}

type SutTypes = {
  sut: UserLoadController
  userRepositoryStub: LoadAllUsersInterface
}
const makeSut = (): SutTypes => {
  const userRepositoryStub = mockLoadAllUser()
  const sut = new UserLoadController(userRepositoryStub)
  return {
    sut,
    userRepositoryStub
  }
}

describe('UserLoadController', () => {
  test('ensure UserLoadController calls userRepository.getAll', async() => {
    const {sut, userRepositoryStub} = makeSut()
    const spy = jest.spyOn(userRepositoryStub, 'getAll')
    await sut.handle()
    expect(spy).toHaveBeenCalledTimes(1)
  })
  test('ensure UserLoadController return list of user on success', async() => {
    const {sut} = makeSut()
    const user = await sut.handle()
    expect(user).toEqual(ok([mockModelUser()]))
  })
  test('ensure UserLoadController return an empty array', async() => {
    const {sut, userRepositoryStub} = makeSut()
    jest.spyOn(userRepositoryStub, 'getAll').mockReturnValueOnce(Promise.resolve([]))
    const result = await sut.handle()
    expect(result).toEqual(ok([]))
  })
  test('ensure UserLoadController return server error if userRepository.getAll throws', async() => {
    const {sut, userRepositoryStub} = makeSut()
    jest.spyOn(userRepositoryStub, 'getAll').mockImplementationOnce(throwException)
    const result = await sut.handle()
    expect(result).toEqual(serverError(new Error()))
  })

})