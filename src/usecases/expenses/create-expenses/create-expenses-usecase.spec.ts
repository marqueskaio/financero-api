import {UsecaseInterface} from "../../../interfaces/usecases/usecase-interface";
import {CreateRepositoryInterface} from "../../../interfaces/repositories/create-repository-interface";
import {ExpensesModel} from "@prisma/client";
import {CreateExpensesUsecase} from "./create-expenses-usecase";
import {mockExpensesRepository} from "../../../tests/repositories/mock-expenses-repository";
import {DbTableTruncate} from "../../../tests/helpers/db-table-truncate";
import DB from "../../../databases";
import {ExpensesRepository} from "../../../repository/expenses/expenses-repository";
import {mockModelExpensesData, mockModelExpensesParams} from "../../../tests/data/mock-expenses-model";

type SutTypes = {
    sut: UsecaseInterface
    createRepository: CreateRepositoryInterface<ExpensesModel,ExpensesModel>
}

const makeSut = (): SutTypes => {
    const createRepository = mockExpensesRepository()
    const sut = new CreateExpensesUsecase(createRepository)
    return {
        sut,
        createRepository
    }
}

beforeEach(async () => {
    await DbTableTruncate("expenses", DB)
})

describe("CreateExpensesUsecase", () => {
    test("should create and return a expense", async () => {
        const sut = new CreateExpensesUsecase(new ExpensesRepository())
        const expense = await sut.execute(mockModelExpensesParams())
        expect(expense).toEqual(mockModelExpensesData())
    })

    test("should call repository with correct value", async () => {
        const {sut, createRepository} = makeSut()
        const spy = jest.spyOn(createRepository,"create")
        await sut.execute(mockModelExpensesParams())
        expect(spy).toHaveBeenCalledWith(mockModelExpensesParams())
    })
})
