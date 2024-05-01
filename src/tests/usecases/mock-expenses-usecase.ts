import {ExpensesModel} from "@prisma/client";
import {UsecaseInterface} from "../../interfaces/usecases/usecase-interface";
import {mockModelExpensesData} from "../factories/mock-expenses-model";

export const mockCreateExpensesUsecase = (): UsecaseInterface => {
    class CreateExpensesUsecaseStub implements UsecaseInterface {
        execute(): Promise<ExpensesModel> {
            return Promise.resolve(mockModelExpensesData())
        }
    }
    return new CreateExpensesUsecaseStub()
}
