import {CreateRepositoryInterface} from "../../interfaces/repositories/create-repository-interface";
import {ExpensesModel} from "@prisma/client";
import {mockModelExpensesData} from "../data/mock-expenses-model";

export const mockExpensesRepository = (): CreateRepositoryInterface<ExpensesModel,ExpensesModel> => {
    class ExpensesRepositoryStub implements CreateRepositoryInterface<ExpensesModel,ExpensesModel> {
        create(): Promise<ExpensesModel | null> {
            return Promise.resolve(mockModelExpensesData({}));
        }
    }
    return new ExpensesRepositoryStub()
}
