import {UserRepository} from "../../repository/user/user-repository";
import {UserLoadController} from "../../controllers/user/user-load/user-load-controller";



const userRepository = new UserRepository()
const userLoadController = new UserLoadController(userRepository)

export {userLoadController}