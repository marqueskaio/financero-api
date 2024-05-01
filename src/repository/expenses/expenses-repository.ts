import {ExpensesModel} from "@prisma/client";
import DB from "../../databases";
import {ExpensesRepositoryInterface} from "../../interfaces/repositories/expenses/expenses-repository-interface";

export class ExpensesRepository implements ExpensesRepositoryInterface{
    async create(data: Omit<ExpensesModel, 'id'>): Promise<ExpensesModel | null> {
        return DB.expensesModel.create({data: data})
    }
}
