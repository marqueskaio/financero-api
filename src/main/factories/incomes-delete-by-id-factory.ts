
import { DeleteByIdIncomesUseCase } from "../../usecases/incomes/incomes-delete/delete-by-id-incomes-usecase";
import { IncomesDeleteByIdController } from "../../controllers/incomes/incomes-delete/incomes-delete-by-id-controller";
import {IncomesRepository} from "../../repository/incomes/incomes-repository";

const incomesRepository = new IncomesRepository();
const deleteIncomesByIdUseCase = new DeleteByIdIncomesUseCase(incomesRepository);
const incomesDeleteByIdController = new IncomesDeleteByIdController(deleteIncomesByIdUseCase);

export { incomesDeleteByIdController };
