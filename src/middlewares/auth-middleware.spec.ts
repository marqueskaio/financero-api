import {UsersModel} from "@prisma/client";
import {AuthMiddleware} from "./auth-middleware";
import {HttpRequest} from "../interfaces/http/http-request";
import {forbidden, ok, serverError} from "../helpers/http/http-helper";
import {AccessDeniedError} from "../helpers/errors/access-denied-error";
import {throwException} from "../tests/helpers/throw-exception";
import {mockModelUser} from "../tests/factories/user-model-factory";
import {LoadAccountByTokenRepository} from "../interfaces/repositories/user/load-user-by-token-interface";

const makeFakeLoadAccountByToken = (): any => {
  class LoadAccountByTokenStub implements LoadAccountByTokenRepository{
    loadByToken(): Promise<UsersModel | null> {
      return Promise.resolve(mockModelUser({role: 'any_role'}));
    }
  }
  return new LoadAccountByTokenStub()
}
const makeHttpRequest = (): HttpRequest => ({
  headers: { 'x-access-token': 'any_token' }
})
type SutTypes = {
  sut: AuthMiddleware
  loadAccountByTokenStub: any
}
const makeSut = (role?: string): SutTypes => {
  const loadAccountByTokenStub = makeFakeLoadAccountByToken()
  const sut = new AuthMiddleware(loadAccountByTokenStub, role)

  return { sut, loadAccountByTokenStub }
}

describe('Auth Middleware', () => {
  test('Should return 403 if no x-access-token is found', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })
  test('Should call LoadAccountByToken with correct accessToken', async () => {
    const role = 'any_role'
    const { sut, loadAccountByTokenStub } = makeSut(role)
    const loadSpy = jest.spyOn(loadAccountByTokenStub, 'loadByToken')
    await sut.handle(makeHttpRequest())
    expect(loadSpy).toHaveBeenCalledWith('any_token')
  })
  test('Should return 403 if LoadAccountByToken return null', async () => {
    const { sut, loadAccountByTokenStub } = makeSut()
    jest.spyOn(loadAccountByTokenStub, 'loadByToken').mockReturnValueOnce(new Promise(resolve => { resolve(null) }))
    const httpResponse = await sut.handle(makeHttpRequest())
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })
  test('Should return 200 if LoadAccountByToken returns an account', async () => {
    const { sut } = makeSut('any_role')
    const httpResponse = await sut.handle(makeHttpRequest())
    expect(httpResponse).toEqual(ok({ accountId: 1 }))
  })
  test('Should return 500 if LoadAccountByToken throws', async () => {
    const { sut, loadAccountByTokenStub } = makeSut()
    jest.spyOn(loadAccountByTokenStub, 'loadByToken').mockImplementationOnce(throwException)
    const httpResponse = await sut.handle(makeHttpRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
