import DB from "../../databases";
import { IncomesModel } from "@prisma/client";
import {IncomesRepositoryInterface} from "../../interfaces/repositories/incomes/incomes-repository-interface";
import {GetByIdRepository} from "../../interfaces/repositories/get-by-id-repository-interface";
import {GetAllRepository} from "../../interfaces/repositories/get-all-repository-interface";
import {UpdateRepository} from "../../interfaces/repositories/update-repository-interface";
import {DeleteRepository} from "../../interfaces/repositories/delete-repository-interface";



export class IncomesRepository implements
    IncomesRepositoryInterface<IncomesModel, IncomesModel>,
    GetByIdRepository<IncomesModel>,
    GetAllRepository<IncomesModel>,
    UpdateRepository<IncomesModel>,
    DeleteRepository<IncomesModel>
{
    async create(data: Omit<IncomesModel, 'id'>): Promise<IncomesModel | null> {
        return DB.incomesModel.create({ data });
    }

    async delete(id: number): Promise<IncomesModel | null> {
        return DB.incomesModel.delete({ where: { id } });
    }

    async update(id: number, data: Omit<IncomesModel, 'id'>): Promise<IncomesModel | null> {
        return DB.incomesModel.update({ where: { id }, data });
    }

    async getAll(): Promise<IncomesModel[] | []> {
        return DB.incomesModel.findMany();
    }

    async getById(id: number): Promise<IncomesModel | null> {
        return DB.incomesModel.findUnique({ where: { id } });
    }
}
