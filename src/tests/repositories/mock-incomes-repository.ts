import {IncomesModel} from "@prisma/client";
import {mockModelIncomeData} from "../factories/mock-incomes-model";
import {IncomesRepositoryInterface} from "../../interfaces/repositories/incomes/incomes-repository-interface";

export const mockIncomesRepository = (): IncomesRepositoryInterface => {
    class IncomesRepositoryStub implements IncomesRepositoryInterface {
        create(): Promise<IncomesModel | null> {
            return Promise.resolve(mockModelIncomeData());
        }
    }
    return new IncomesRepositoryStub()
}