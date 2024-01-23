import {UserRepository} from "./user-repository";
import {mockModelUser, mockModelUserParams} from "../../tests/factories/user-model-factory";
import DB from "../../databases";
import {DbTableTruncate} from "../../tests/helpers/db-table-truncate";
import {mockSignInAdminParams} from "../../tests/factories/sign-in-model-factory";

const makeSut = () => {
  return new UserRepository()
}
describe('UserRepository', () => {
  beforeEach(async () => {
    await DbTableTruncate('users', DB)
  })
  test('ensure UserRepository save new user', async () => {
    const sut = makeSut()
    const user = await sut.create(mockModelUser())
    expect(user).toEqual(mockModelUser({id: 1}))
  })
  test('ensure UserRepository findByEmail return an user', async () => {
    await DB.usersModel.create({data: mockModelUserParams()})
    const sut = makeSut()
    const user = await sut.findByEmail('any_email')
    expect(user).toEqual(mockModelUser({id: 1}))
  })
  test('ensure UserRepository findByEmail return null', async () => {
    const sut = makeSut()
    const user = await sut.findByEmail('any_email')
    expect(user).toBeNull()
  })
  test('ensure UserRepository authenticate return an user on success', async () => {
    await DB.usersModel.create({data: mockModelUserParams()})
    const sut = makeSut()
    const user = await sut.authenticate(mockSignInAdminParams())
    expect(user).toEqual(mockModelUser())
  })
  test('ensure UserRepository authenticate return null if invalid credential is provided', async () => {
    const sut = makeSut()
    const user = await sut.authenticate(mockSignInAdminParams())
    expect(user).toEqual(null)
  })
  test('ensure UserRepository updateAccessToken return an user with accessToken', async () => {
    const userMock = await DB.usersModel.create({data: mockModelUserParams()})
    const sut = makeSut()
    const user = await sut.updateAccessToken(userMock.id, 'encrypter_access_token')
    expect(user).toEqual(mockModelUser({accessToken: 'encrypter_access_token'}))
  })
  test('ensure UserRepository getAll return an list of user', async () => {
    await DB.usersModel.create({data: mockModelUserParams()})
    await DB.usersModel.create({data: mockModelUserParams()})
    const sut = makeSut()
    const user = await sut.getAll()
    expect(user).toEqual([
      mockModelUser({accessToken: null}),
      mockModelUser({accessToken: null, id: 2})
    ])
  })
  test('ensure UserRepository getAll return an empty array', async () => {
    const sut = makeSut()
    const user = await sut.getAll()
    expect(user).toEqual([])
  })
  test('ensure UserRepository loadByToken return an user', async () => {
    const userMock = await DB.usersModel.create({data: mockModelUser({accessToken: 'any_token', role: 'admin'})})
    const userMock2 = await DB.usersModel.create({data: mockModelUser({id: 2,accessToken: 'other_token', role: 'admin'})})
    const sut = makeSut()
    const user = await sut.loadByToken('any_token')
    expect(user).toEqual(userMock)
    const user2 = await sut.loadByToken('other_token')
    expect(user2).toEqual(userMock2)
  })
  test('ensure UserRepository findById return an user', async () => {
    const userMock = await DB.usersModel.create({data: mockModelUser({accessToken: 'any_token', role: 'admin'})})
    const sut = makeSut()
    const user = await sut.findById(1)
    expect(user).toEqual(userMock)
  })
  test('ensure UserRepository findById return null', async () => {
    const sut = makeSut()
    const user = await sut.findById(1)
    expect(user).toBeNull()
  })
})