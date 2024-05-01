import {ExpensesModel} from "@prisma/client";

export interface ExpensesRepositoryInterface{
    create: (data: Omit<ExpensesModel, 'id'>) => Promise<ExpensesModel | null>
}
