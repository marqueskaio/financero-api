import {IncomesModel} from "@prisma/client";

export interface IncomesRepositoryInterface {
    create: (data: Omit<IncomesModel, 'id'>) => Promise<IncomesModel | null>
}