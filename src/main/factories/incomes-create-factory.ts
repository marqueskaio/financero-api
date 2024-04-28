import {CreateIncomesController} from "../../controllers/incomes/incomes-create/create-incomes-controller";
import {CreateIncomesUsecase} from "../../usecases/incomes/create-incomes/create-incomes-usecase";
import {IncomesRepository} from "../../repository/incomes/incomes-repository";

const incomesRepository = new IncomesRepository()

const createIncomesUsecase = new CreateIncomesUsecase(incomesRepository)

const createIncomesController = new CreateIncomesController(createIncomesUsecase)

export { createIncomesController }
