import {CreateExpensesController} from "./create-expenses-controller";
import {UsecaseInterface} from "../../../interfaces/usecases/usecase-interface";
import {ok} from "../../../helpers/http/http-helper";
import {DbTableTruncate} from "../../../tests/helpers/db-table-truncate";
import DB from "../../../databases";
import {mockCreateExpensesUsecase} from "../../../tests/usecases/mock-expenses-usecase";
import {mockModelExpensesData} from "../../../tests/data/mock-expenses-model";

interface SutType {
    sut: CreateExpensesController
    createExpensesUsecaseStub: UsecaseInterface
}

const makeSut = (): SutType => {
    const createExpensesUsecaseStub = mockCreateExpensesUsecase()
    const sut: CreateExpensesController = new CreateExpensesController(createExpensesUsecaseStub)
    return {
        sut,
        createExpensesUsecaseStub
    }
}

beforeEach(async () => {
    await DbTableTruncate("expenses", DB)
})


describe("Create Expenses Controller", () => {
    test("Should return 200 on success", async () => {
        const {sut: CreateExpensesController} = makeSut()
        const httpRequest = {body:mockModelExpensesData()}
        const result = await CreateExpensesController.handle(httpRequest)
        expect(result).toEqual(ok(mockModelExpensesData()))
    })
})
