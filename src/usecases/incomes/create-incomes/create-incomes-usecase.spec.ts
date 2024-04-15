import {CreateIncomesUsecase} from "./create-incomes-usecase";
import {IncomesRepository} from "../../../repository/incomes/incomes-repository";
import {mockModelIncomeData, mockModelIncomeParams} from "../../../tests/factories/mock-incomes-model";
import {DbTableTruncate} from "../../../tests/helpers/db-table-truncate";
import DB from "../../../databases";

beforeEach(async () => {
    await DbTableTruncate("incomes", DB)
})

describe("CreateIncomesUsecase", () => {
    test("should create and return a income", async () => {
        const sut = new CreateIncomesUsecase(new IncomesRepository())
        const income = await sut.execute(mockModelIncomeParams())
        expect(income).toEqual(mockModelIncomeData())
    })

    // test("should return null if income is not created", async () => {
    //     const sut = new CreateIncomesUsecase(new IncomesRepository())
    //     const income = await sut.execute(mockModelIncomeParams())
    //     expect(income).toBeNull()
    // })
})