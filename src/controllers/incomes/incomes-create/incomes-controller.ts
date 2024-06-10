import { Request, Response } from 'express';
import {DeleteByIdIncomesUseCase} from "../../../interfaces/usecases/delete-by-id-incomes-usecase";
import {IncomesRepository} from "../../../repository/incomes/incomes-repository";


export class IncomesController {
    private deleteByIdIncomesUseCase: DeleteByIdIncomesUseCase;

    constructor() {
        const incomesRepository = new IncomesRepository();
        this.deleteByIdIncomesUseCase = new DeleteByIdIncomesUseCase(incomesRepository);
    }

    public async deleteIncome(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            await this.deleteByIdIncomesUseCase.execute(Number(id));
            return res.status(200).json({ message: 'Income deleted successfully' });
        } catch (error: any) {
            if (error.message === 'Income not found') {
                return res.status(404).json({ message: error.message });
            }
            return res.status(500).json({ message: 'Internal Server Error', error: error.message });
        }
    }
}
