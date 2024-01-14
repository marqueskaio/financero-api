import {SignInAdminUsecase} from "../../usecases/auth/sign-in-admin/sign-in-admin-usecase";
import {UserRepository} from "../../repository/user/user-repository";
import {SignInController} from "../../controllers/auth/sign-in/sign-in-controller";
import {BcryptAdapter} from "../../adapters/bcrypt/bcrypt-adapter";
import {JwtAdapter} from "../../adapters/jwl-adapter/jwt-adapter";

const repository = new UserRepository()
const hasher = new BcryptAdapter(12)
const encrypter = new JwtAdapter('secret')
const usecase = new SignInAdminUsecase(repository, hasher)
const signInController = new SignInController(usecase, encrypter, repository, hasher)

export {signInController}