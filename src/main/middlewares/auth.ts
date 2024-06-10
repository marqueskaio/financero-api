import {adaptMiddleware} from "../adapters/express-middleware-adapter";
import {makeAuthMiddleware} from "../factories/auth-middleware-factory";

export const auth = adaptMiddleware(makeAuthMiddleware('user'))
