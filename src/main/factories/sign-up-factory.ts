import {SignUpController} from "../../controllers/auth/sign-up/sign-up-controller";
import {UserRepository} from "../../repository/user/user-repository";
import {SignUpAdminUsecase} from "../../usecases/auth/sign-up-admin/sign-up-admin-usecase";
import {BcryptAdapter} from "../../adapters/bcrypt/bcrypt-adapter";
import {JwtAdapter} from "../../adapters/jwl-adapter/jwt-adapter";
import {makeSignUpValidation} from "../../controllers/auth/sign-up/sign-up-validation";

const repository = new UserRepository()
const hasher = new BcryptAdapter(12)
const encrypter = new JwtAdapter('secret')
const usecase = new SignUpAdminUsecase(repository, hasher)
const signUpController = new SignUpController(usecase, encrypter, repository, makeSignUpValidation())

export {signUpController}