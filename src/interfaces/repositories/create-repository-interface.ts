import {IncomesModel} from "@prisma/client";

export interface CreateRepositoryInterface <P,R> {
    create: (data: { data: Date; description: string; value: number }) => Promise<IncomesModel | null>
}