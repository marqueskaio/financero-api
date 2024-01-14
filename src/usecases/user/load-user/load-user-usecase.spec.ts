import {mockModelUser} from "../../../tests/factories/user-model-factory";
import {LoadUserUsecase} from "./load-user-usecase";
import {LoadAllUsersInterface} from "../../../interfaces/repositories/user/load-all-users-interface";
import {UsersModel} from "@prisma/client";


const mockUserRepository = (): LoadAllUsersInterface => {
  class UserRepositoryStub implements LoadAllUsersInterface {
    getAll(): Promise<UsersModel[] | []> {
      return Promise.resolve([mockModelUser()]);
    }
  }

  return new UserRepositoryStub()
}

type SutTypes = {
  sut: LoadUserUsecase
  userRepositoryStub: LoadAllUsersInterface
}

const makeSut = (): SutTypes => {
  const userRepositoryStub = mockUserRepository()
  const sut = new LoadUserUsecase(userRepositoryStub)
  return {
    sut,
    userRepositoryStub
  }
}

describe('LoadUserUsecase', () => {
  test('ensure LoadUserUsecase calls userRepository.getAll', async () => {
    const {sut, userRepositoryStub} = makeSut()
    const spy = jest.spyOn(userRepositoryStub, 'getAll')
    await sut.getAll()
    expect(spy).toHaveBeenCalledTimes(1)
  })
  test('ensure userRepository.getAll return array of User on success', async () => {
    const {sut} = makeSut()
    const users = await sut.getAll()
    expect(users).toEqual([mockModelUser()])
  })
  test('ensure userRepository.getAll return empty array', async () => {
    const {sut, userRepositoryStub} = makeSut()
    jest.spyOn(userRepositoryStub, 'getAll').mockReturnValueOnce(Promise.resolve([]))
    const users = await sut.getAll()
    expect(users).toEqual([])
  })
})