import {
    DeleteByIdIncomesUseCaseInterface
} from "../../../interfaces/usecases/incomes-delete/delete-by-id-incomes-usecase-interface";
import {IncomesRepository} from "../../../repository/incomes/incomes-repository";

;

export class DeleteByIdIncomesUseCase implements DeleteByIdIncomesUseCaseInterface {
    private incomesRepository: IncomesRepository;

    constructor(incomesRepository: IncomesRepository) {
        this.incomesRepository = incomesRepository;
    }

    public async execute(id: number): Promise<void> {
        const income = await this.incomesRepository.getById(id);

        if (!income) {
            throw new Error('Income not found');
        }

        await this.incomesRepository.delete(id);
    }
}
