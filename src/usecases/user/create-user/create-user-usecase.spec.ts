import {CreateUserUsecase} from "./create-user-usecase";
import {UserRepositoryInterface} from "../../../interfaces/repositories/user/user-repository-interface";
import {mockModelUser} from "../../../tests/factories/user-model-factory";
import {throwException} from "../../../tests/helpers/throw-exception";
import {mockUserRepository} from "../../../tests/repositories/mock-user-repository";

type SutTypes = {
  sut: CreateUserUsecase
  userRepositoryStub: UserRepositoryInterface
}

const makeSut = (): SutTypes => {
  const userRepositoryStub = mockUserRepository()
  const sut = new CreateUserUsecase(userRepositoryStub)
  return {
    sut,
    userRepositoryStub
  }
}

describe('CreateUserUsecase', () => {
  test('ensure CreateUserUsecase calls userRepository.create with correct params', async() => {
    const {sut, userRepositoryStub} = makeSut()
    const spy = jest.spyOn(userRepositoryStub, 'save')
    await sut.execute({})
    expect(spy).toHaveBeenCalledWith({})
  })
  test('ensure CreateUserUsecase return correct values on success', async () => {
    const {sut} = makeSut()
    const user = await sut.execute(mockModelUser())
    expect(user).toEqual(mockModelUser())
  })
  test('ensure CreateUserUsecase return error if userRepository fail', async () => {
    const {sut, userRepositoryStub} = makeSut()
    jest.spyOn(userRepositoryStub, 'save').mockImplementationOnce(throwException)
    const promise = sut.execute(mockModelUser())
    await expect(promise).rejects.toThrow()
  })
  test('ensure CreateUserUsecase calls userRepository.findByEmail with correct email', async() => {
    const {sut, userRepositoryStub} = makeSut()
    const spy = jest.spyOn(userRepositoryStub, 'findByEmail')
    await sut.execute(mockModelUser())
    expect(spy).toHaveBeenCalledWith('any_email')
  })
  test('ensure CreateUserUsecase throws if userRepository.findByEmail return an user', async() => {
    const {sut, userRepositoryStub} = makeSut()
    jest.spyOn(userRepositoryStub, 'findByEmail').mockReturnValueOnce(Promise.resolve(mockModelUser()))
    const response = sut.execute(mockModelUser())
    await expect(response).rejects.toThrow()
  })
})