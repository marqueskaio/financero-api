import {FindUserByIdUsecase} from "./find-user-by-id-usecase";
import {FindUserByIdInterface} from "../../../interfaces/repositories/user/find-user-by-id-interface";
import {UsersModel} from "@prisma/client";
import {mockModelUser} from "../../../tests/factories/user-model-factory";
import {throwException} from "../../../tests/helpers/throw-exception";

const makeRepositoryFindById = (): FindUserByIdInterface => {
  class FindUserByIdRepositoryStub implements FindUserByIdInterface {
    findById(): Promise<UsersModel | null> {
      return Promise.resolve(mockModelUser());
    }
  }

  return new FindUserByIdRepositoryStub()
}
type SutTypes = {
  sut: FindUserByIdUsecase
  findUserByIdRepositoryStub: FindUserByIdInterface
}
const makeSut = (): SutTypes => {
  const findUserByIdRepositoryStub = makeRepositoryFindById()
  const sut = new FindUserByIdUsecase(findUserByIdRepositoryStub)
  return {
    sut,
    findUserByIdRepositoryStub
  }
}
describe('FindUserById Usecase', () => {
  test('should call findById with correct params', async () => {
    const {sut, findUserByIdRepositoryStub} = makeSut()
    const spy = jest.spyOn(findUserByIdRepositoryStub, 'findById')
    await sut.execute(1)
    expect(spy).toHaveBeenCalledWith(1)
  })
  test('should return an user on success', async () => {
    const {sut} = makeSut()
    const result = await sut.execute(1)
    expect(result).toEqual(mockModelUser())
  })
  test('should return null if not found', async () => {
    const {sut, findUserByIdRepositoryStub} = makeSut()
    jest.spyOn(findUserByIdRepositoryStub, 'findById').mockReturnValueOnce(Promise.resolve(null))
    const result = await sut.execute(1)
    expect(result).toBeNull()
  })
  test('should throw if FindUserByIdRepository fail', async () => {
    const {sut, findUserByIdRepositoryStub} = makeSut()
    jest.spyOn(findUserByIdRepositoryStub, 'findById').mockImplementationOnce(throwException)
    const promise = sut.execute(1)
    await expect(promise).rejects.toEqual(new Error())
  })
})