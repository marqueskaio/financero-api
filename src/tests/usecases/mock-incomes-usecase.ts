import {UsecaseInterface} from "../../interfaces/usecases/usecase-interface";
import {IncomesModel} from "@prisma/client";
import {mockModelIncomeData} from "../data/mock-incomes-model";

export const mockCreateIncomesUsecase = (): UsecaseInterface => {
    class CreateIncomesUsecaseStub implements UsecaseInterface {
        execute(): Promise<IncomesModel> {
            return Promise.resolve(mockModelIncomeData())
        }
    }
    return new CreateIncomesUsecaseStub()
}
