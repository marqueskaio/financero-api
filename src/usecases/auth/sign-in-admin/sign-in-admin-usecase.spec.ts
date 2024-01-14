import {SignInAdminUsecase} from "./sign-in-admin-usecase";
import {UserRepositoryInterface} from "../../../interfaces/repositories/user/user-repository-interface";
import {mockUserRepository} from "../../../tests/repositories/mock-user-repository";
import {mockModelUser} from "../../../tests/factories/user-model-factory";
import {SignInUsecaseInterface} from "../../../interfaces/usecases/sign-in-usecase-interface";
import {mockSignInAdminParams} from "../../../tests/factories/sign-in-model-factory";
import {throwException} from "../../../tests/helpers/throw-exception";
import {mockHasherAdapter} from "../../../tests/adapters/mock-hasher-adapter";

type SutTypes = {
  sut: SignInUsecaseInterface
  userRepositoryStub: UserRepositoryInterface
}
const makeSut = (): SutTypes => {
  const bcryptAdapterStub = mockHasherAdapter()
  const userRepositoryStub = mockUserRepository()
  const sut = new SignInAdminUsecase(userRepositoryStub, bcryptAdapterStub)
  return {
    sut,
    userRepositoryStub
  }
}

describe('SignInAdmin Usecase', () => {

  test('ensure SignInAdmin call UserRepository.authenticate with correct values', async () => {
    const {sut, userRepositoryStub} = makeSut()
    const saveSpy = jest.spyOn(userRepositoryStub, 'authenticate')
    await sut.execute(mockSignInAdminParams())
    expect(saveSpy).toHaveBeenCalledWith(mockSignInAdminParams({password: 'hashed_value'}))
  })
  test('ensure SignInAdmin return an user on success', async () => {
    const {sut} = makeSut()
    const user = await sut.execute(mockSignInAdminParams())
    expect(user).toEqual(mockModelUser({id: 1, role: 'admin'}))
  })
  test('ensure SignInAdmin return null if invalid credential is provided', async () => {
    const {sut, userRepositoryStub} = makeSut()
    jest.spyOn(userRepositoryStub, 'authenticate').mockReturnValueOnce(Promise.resolve(null))
    const result = await sut.execute(mockSignInAdminParams())
    await expect(result).toBeNull()
  })
  test('ensure SignInAdmin return an error if email exist user with email provided', async () => {
    const {sut, userRepositoryStub} = makeSut()
    jest.spyOn(userRepositoryStub, 'authenticate').mockImplementationOnce(throwException)
    const promise = sut.execute(mockSignInAdminParams())
    await expect(promise).rejects.toThrow()
  })
})