import {IncomesModel} from "@prisma/client";
import {mockModelIncomeData} from "../factories/mock-incomes-model";
import {CreateRepositoryInterface} from "../../interfaces/repositories/create-repository-interface";

export const mockIncomesRepository = (): CreateRepositoryInterface<IncomesModel,IncomesModel> => {
    class IncomesRepositoryStub implements CreateRepositoryInterface<IncomesModel,IncomesModel> {
        create(): Promise<IncomesModel | null> {
            return Promise.resolve(mockModelIncomeData({}));
        }
    }
    return new IncomesRepositoryStub()
}
