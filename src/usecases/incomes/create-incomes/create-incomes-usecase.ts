import {UsecaseInterface} from "../../../interfaces/usecases/usecase-interface";
import {IncomesRepositoryInterface} from "../../../interfaces/repositories/incomes/incomes-repository-interface";
import {IncomesModel} from "@prisma/client";


export class CreateIncomesUsecase implements UsecaseInterface {
    constructor(
        private readonly incomesRepository: IncomesRepositoryInterface<IncomesModel, IncomesModel>,
    ){}

    execute(data: Omit<IncomesModel, "id">): Promise<IncomesModel | null> {
        return this.incomesRepository.create(data)
    }
}
