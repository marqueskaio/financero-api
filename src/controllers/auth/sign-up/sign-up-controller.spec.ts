import {mockModelUser} from "../../../tests/factories/user-model-factory";
import {Controller} from "../../../interfaces/controllers/Controller";
import {SignUpController} from "./sign-up-controller";
import {SignUpUsecaseInterface} from "../../../interfaces/usecases/sign-up-usecase-interface";
import {mockSignUpUsecase} from "../../../tests/usecases/mock-sign-up-usecase";
import {throwException} from "../../../tests/helpers/throw-exception";
import {badRequest, ok, serverError, unauthorized} from "../../../helpers/http/http-helper";
import {mockEncrypterAdapter} from "../../../tests/adapters/mock-encrypter-adapter";
import {mockUserRepository} from "../../../tests/repositories/mock-user-repository";
import {mockValidation} from "../../../tests/factories/mock-validation";
import {Validation} from "../../../interfaces/protocols/validation";

type SutTypes = {
  sut: Controller
  signUpUsecaseStub: SignUpUsecaseInterface
  validationStub: Validation
}
const makeSut = (): SutTypes => {
  const encrypterStub = mockEncrypterAdapter()
  const userRepository = mockUserRepository()
  const signUpUsecaseStub = mockSignUpUsecase()
  const validationStub = mockValidation()
  const sut = new SignUpController(signUpUsecaseStub, encrypterStub, userRepository, validationStub)
  return {
    sut,
    signUpUsecaseStub,
    validationStub
  }
}

describe('SignUpController', () => {
  test('ensure SignUpController calls usecase with correct values', async () => {
    const {sut, signUpUsecaseStub} = makeSut()
    const spy = jest.spyOn(signUpUsecaseStub, 'execute')
    await sut.handle({body: mockModelUser()})
    expect(spy).toHaveBeenCalledWith(mockModelUser())
  })
  test('Should call Validation with correct value', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
      }
    }
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })
  test('ensure SignUpController return 200 on success', async () => {
    const {sut} = makeSut()
    const response = await sut.handle({body: mockModelUser()})
    expect(response).toEqual(ok(mockModelUser({accessToken: 'ecrypt_access_token'})))
  })
  test('ensure SignUpController return an error if usecase throws', async () => {
    const {sut, signUpUsecaseStub} = makeSut()
    jest.spyOn(signUpUsecaseStub, 'execute').mockImplementationOnce(throwException)
    const response = await sut.handle({body: mockModelUser()})
    expect(response).toEqual(serverError(new Error()))
  })
  test('ensure SignUpController return unauthorized if hash.compare fail', async () => {
    const {sut, signUpUsecaseStub} = makeSut()
    jest.spyOn(signUpUsecaseStub, 'execute').mockReturnValueOnce(Promise.resolve(null))
    const response = await sut.handle({body: mockModelUser()})
    expect(response).toEqual(unauthorized())
  })
  test('ensure SignUpController return badRequest if validation fail', async () => {
    const {sut, validationStub} = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error())
    const response = await sut.handle({body: mockModelUser()})
    expect(response).toEqual(badRequest(new Error()))
  })
})