import {SignUpUsecaseInterface} from "../../../interfaces/usecases/sign-up-usecase-interface";
import {SignUpAdminUsecase} from "./sign-up-admin-usecase";
import {UserRepositoryInterface} from "../../../interfaces/repositories/user/user-repository-interface";
import {mockUserRepository} from "../../../tests/repositories/mock-user-repository";
import {mockSignUpAdminParams} from "../../../tests/factories/sign-up-model-factory";
import {mockModelUser} from "../../../tests/factories/user-model-factory";
import {mockHasherAdapter} from "../../../tests/adapters/mock-hasher-adapter";
import {HasherAdapterInterface} from "../../../interfaces/adapter/hash-adapter-interface";

type SutTypes = {
  sut: SignUpUsecaseInterface
  userRepositoryStub: UserRepositoryInterface
  hasherStub: HasherAdapterInterface
}
const makeSut = (): SutTypes => {
  const userRepositoryStub = mockUserRepository()
  const hasherStub = mockHasherAdapter()
  const sut = new SignUpAdminUsecase(userRepositoryStub, hasherStub)
  return {
    sut,
    userRepositoryStub,
    hasherStub
  }
}

describe('SignUpAdmin Usecase', () => {

  test('ensure SignUpAdmin call UserRepository.save with correct values', async () => {
    const {sut, userRepositoryStub} = makeSut()
    const saveSpy = jest.spyOn(userRepositoryStub, 'save')
    await sut.execute(mockSignUpAdminParams())
    expect(saveSpy).toHaveBeenCalledWith(mockSignUpAdminParams({role: 'admin', password: 'hashed_value', accessToken: ''}))
  })
  test('ensure SignUpAdmin call UserRepository.save with role admin', async () => {
    const {sut, userRepositoryStub} = makeSut()
    const saveSpy = jest.spyOn(userRepositoryStub, 'save')
    await sut.execute(mockSignUpAdminParams({role: 'user'}))
    expect(saveSpy).toHaveBeenCalledWith(mockSignUpAdminParams({role: 'admin', password: 'hashed_value', accessToken: ''}))
  })
  test('ensure SignUpAdmin return an user on success', async () => {
    const {sut} = makeSut()
    const user = await sut.execute(mockSignUpAdminParams({role: 'user'}))
    expect(user).toEqual(mockModelUser())
  })
  test('ensure SignUpAdmin calls userRepository.findByEmail with correct email', async () => {
    const {sut, userRepositoryStub} = makeSut()
    const spy = jest.spyOn(userRepositoryStub, 'findByEmail')
    await sut.execute(mockSignUpAdminParams())
    expect(spy).toHaveBeenCalledWith('any_email')
  })
  test('ensure SignUpAdmin return an error if email exist user with email provided', async () => {
    const {sut, userRepositoryStub} = makeSut()
    jest.spyOn(userRepositoryStub, 'findByEmail').mockReturnValueOnce(Promise.resolve(mockModelUser()))
    const promise = sut.execute(mockSignUpAdminParams())
    await expect(promise).rejects.toThrow()
  })
  test('ensure SignUpAdmin call hasher with correct values', async () => {
    const {sut, hasherStub} = makeSut()
    const saveSpy = jest.spyOn(hasherStub, 'hash')
    await sut.execute(mockSignUpAdminParams())
    expect(saveSpy).toHaveBeenCalledWith('any_password')
  })
})