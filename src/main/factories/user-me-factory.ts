import {UserRepository} from "../../repository/user/user-repository";
import {UserMeController} from "../../controllers/user/user-me/user-me-controller";
import {FindUserByIdUsecase} from "../../usecases/user/find-user-by-id/find-user-by-id-usecase";


const userRepository = new UserRepository()
const findUserById = new FindUserByIdUsecase(userRepository)
const userMeController = new UserMeController(findUserById)

export {userMeController}