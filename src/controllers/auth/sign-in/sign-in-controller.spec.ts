import {mockModelUser} from "../../../tests/factories/user-model-factory";
import {Controller} from "../../../interfaces/controllers/Controller";
import {SignInController} from "./sign-in-controller";
import {ok, serverError, unauthorized} from "../../../helpers/http/http-helper";
import {mockSignInUsecase} from "../../../tests/usecases/mock-sign-in-usecase";
import {mockSignInAdminParams} from "../../../tests/factories/sign-in-model-factory";
import {SignInUsecaseInterface} from "../../../interfaces/usecases/sign-in-usecase-interface";
import {mockEncrypterAdapter} from "../../../tests/adapters/mock-encrypter-adapter";
import {mockUserRepository} from "../../../tests/repositories/mock-user-repository";
import {UserRepositoryInterface} from "../../../interfaces/repositories/user/user-repository-interface";
import {EncrypterAdapterInterface} from "../../../interfaces/adapter/encrypter-adapter-interface";
import {mockHasherCompareAdapter} from "../../../tests/adapters/mock-hasher-adapter";
import {HashComparerAdapterInterface} from "../../../interfaces/adapter/hash-comparer-adapter-interface";
import {throwException} from "../../../tests/helpers/throw-exception";

type SutTypes = {
  sut: Controller
  signInUsecaseStub: SignInUsecaseInterface
  userRepositoryStub: UserRepositoryInterface
  encrypterStub: EncrypterAdapterInterface
  hasherCompareStub: HashComparerAdapterInterface
}
const makeSut = (): SutTypes => {
  const userRepositoryStub = mockUserRepository()
  const encrypterStub = mockEncrypterAdapter()
  const signInUsecaseStub = mockSignInUsecase()
  const hasherCompareStub = mockHasherCompareAdapter()
  const sut = new SignInController(signInUsecaseStub, encrypterStub, userRepositoryStub, hasherCompareStub)
  return {
    sut,
    signInUsecaseStub,
    userRepositoryStub,
    encrypterStub,
    hasherCompareStub
  }
}

describe('SignInController', () => {
  test('ensure SignInController return 200 on success', async () => {
    const {sut, userRepositoryStub} = makeSut()
    jest.spyOn(userRepositoryStub, 'findByEmail').mockReturnValueOnce(Promise.resolve(mockModelUser()))
    const response = await sut.handle({body: mockSignInAdminParams()})
    expect(response).toEqual(ok(mockModelUser({accessToken: "ecrypt_access_token"})))
  })
  test('ensure SignInController return unauthorized if user is not admin', async () => {
    const {sut, signInUsecaseStub} = makeSut()
    jest.spyOn(signInUsecaseStub, 'execute')
      .mockReturnValueOnce(Promise.resolve(mockModelUser({role: 'user'})))
    const response = await sut.handle({body: mockModelUser()})
    expect(response).toEqual(unauthorized())
  })
  test('ensure SignInController return unauthorized if hash.compare fail', async () => {
    const {sut, hasherCompareStub, userRepositoryStub} = makeSut()
    jest.spyOn(userRepositoryStub, 'findByEmail').mockReturnValueOnce(Promise.resolve(mockModelUser()))
    jest.spyOn(hasherCompareStub, 'compare').mockReturnValueOnce(Promise.resolve(false))
    const response = await sut.handle({body: mockModelUser()})
    expect(response).toEqual(unauthorized())
  })
  test('ensure SignInController return serverError if hash.compare throws', async () => {
    const {sut, hasherCompareStub, userRepositoryStub} = makeSut()
    jest.spyOn(userRepositoryStub, 'findByEmail').mockReturnValueOnce(Promise.resolve(mockModelUser()))
    jest.spyOn(hasherCompareStub, 'compare').mockImplementationOnce(throwException)
    const result = await sut.handle({body: mockModelUser()})
     expect(result).toEqual(serverError(new Error()))
  })

})