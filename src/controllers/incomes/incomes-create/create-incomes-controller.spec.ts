import {CreateIncomesController} from "./create-incomes-controller";
import {UsecaseInterface} from "../../../interfaces/usecases/usecase-interface";
import {mockCreateIncomesUsecase} from "../../../tests/usecases/mock-incomes-usecase";
import {DbTableTruncate} from "../../../tests/helpers/db-table-truncate";
import DB from "../../../databases";
import {mockModelIncomeData} from "../../../tests/factories/mock-incomes-model";
import {ok, serverError} from "../../../helpers/http/http-helper";

interface SutType {
    sut: CreateIncomesController
    createIncomesUsecaseStub: UsecaseInterface
}

 const makeSut = (): SutType => {
    const createIncomesUsecaseStub = mockCreateIncomesUsecase()
    const sut = new CreateIncomesController(createIncomesUsecaseStub)
    return {
        sut,
        createIncomesUsecaseStub
    }
 }

 describe("Create Incomes Controller", () => {

     beforeEach(async () => {
         await DbTableTruncate("incomes", DB)
     })

     describe("CreateIncomesController", () => {
         test("Should return 200 on success", async () => {
             const {sut} = makeSut()
             const httpRequest = {body:mockModelIncomeData()}
             const result = await sut.handle(httpRequest)
             expect(result).toEqual(ok(mockModelIncomeData()))
         })

         test("Should return 500 if CreateIncomesUsecase throws", async () => {
             const {sut, createIncomesUsecaseStub} = makeSut()
             jest.spyOn(createIncomesUsecaseStub, "execute").mockImplementationOnce(() => {throw new Error()})
             const httpRequest = {body:mockModelIncomeData()}
             const result = await sut.handle(httpRequest)
             expect(result).toEqual(serverError((new Error())))
         })
     })
 })
