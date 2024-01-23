import { IncomesModel } from "@prisma/client";
import DB from "../../../databases";
import { CreateRepositoryInterface } from "interfaces/repositories/create-repository-interface";


export class IncomesRepository implements CreateRepositoryInterface<IncomesModel, IncomesModel> {
    create(data: Omit<IncomesModel, 'id'>): Promise<IncomesModel> {
        return DB.incomesModel.create({data: data})
    }
}