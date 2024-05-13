import {UsecaseInterface} from "../../../interfaces/usecases/usecase-interface";
import {ExpensesRepositoryInterface} from "../../../interfaces/repositories/expenses/expenses-repository-interface";
import {ExpensesModel} from "@prisma/client";

export class    CreateExpensesUsecase implements UsecaseInterface {
    constructor(
        private readonly expensesRepository: ExpensesRepositoryInterface,
    ){}

    execute(data: Omit<ExpensesModel, "id">): Promise<ExpensesModel | null> {
        return this.expensesRepository.create(data)
    }
}
