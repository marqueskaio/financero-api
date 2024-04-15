import DB from "../../databases";
import {IncomesModel} from "@prisma/client";
import {
    IncomesRepositoryInterface,
} from "../../interfaces/repositories/incomes/incomes-repository-interface";


export class IncomesRepository implements IncomesRepositoryInterface{
    async create(data: Omit<IncomesModel, 'id'>): Promise<IncomesModel | null> {
        return DB.incomesModel.create({data: data})
    }
}