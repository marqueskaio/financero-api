import {IncomesModel} from "@prisma/client";

export interface CreateRepositoryInterface <P,R> {
    create: (data: Omit<P, "id">) => Promise<R | null>
}
