import {CreateIncomesUsecase} from "./create-incomes-usecase";
import {IncomesRepository} from "../../../repository/incomes/incomes-repository";
import {mockModelIncomeData, mockModelIncomeParams} from "../../../tests/factories/mock-incomes-model";
import {DbTableTruncate} from "../../../tests/helpers/db-table-truncate";
import DB from "../../../databases";
import {CreateRepositoryInterface} from "../../../interfaces/repositories/create-repository-interface";
import {IncomesModel} from "@prisma/client";
import {UsecaseInterface} from "../../../interfaces/usecases/usecase-interface";
import {mockIncomesRepository} from "../../../tests/repositories/mock-incomes-repository";

type SutTypes = {
    sut: UsecaseInterface
    createRepository: CreateRepositoryInterface<IncomesModel,IncomesModel>

}

const makeSut = (): SutTypes => {
    const createRepository = mockIncomesRepository()
    const sut = new CreateIncomesUsecase(createRepository)
    return {
        sut,
        createRepository
    }
}

beforeEach(async () => {
    await DbTableTruncate("incomes", DB)
})

describe("CreateIncomesUsecase", () => {
    test("should create and return a income", async () => {
        const sut = new CreateIncomesUsecase(new IncomesRepository())
        const income = await sut.execute(mockModelIncomeParams())
        expect(income).toEqual(mockModelIncomeData())
    })

    test("should call repository with correct value", async () => {
        const {sut, createRepository} = makeSut()
        const spy = jest.spyOn(createRepository,"create")
        await sut.execute(mockModelIncomeParams())
        expect(spy).toHaveBeenCalledWith(mockModelIncomeParams())
    })
})
