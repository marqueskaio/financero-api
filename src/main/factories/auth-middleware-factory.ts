import {Middleware} from "../../interfaces/protocols/middleware";
import {AuthMiddleware} from "../../middlewares/auth-middleware";
import {UserRepository} from "../../repository/user/user-repository";

export const makeAuthMiddleware = (role?: string): Middleware => {
  const userRepository = new UserRepository()
  return new AuthMiddleware(userRepository, role)
}
