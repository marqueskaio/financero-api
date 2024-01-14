import {UserCreateController} from "../../controllers/user/user-create/user-create-controller";
import {CreateUserUsecase} from "../../usecases/user/create-user/create-user-usecase";
import {UserRepository} from "../../repository/user/user-repository";
import {makeCreateUserValidation} from "../../controllers/user/user-create/user-create-validation";



const userRepository = new UserRepository()

const usecase = new CreateUserUsecase(userRepository)

const controller = new UserCreateController(usecase, makeCreateUserValidation())

export {controller}