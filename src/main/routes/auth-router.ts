import { type Router } from 'express'
import {adaptRoute} from "../adapters/express-routes-adapter";
import {signUpController} from "../factories/sign-up-factory";
import {signInController} from "../factories/sign-in-factory";

export default (router: Router): void => {
  router.post('/sign-up/:role', adaptRoute(signUpController))
  router.post('/sign-in', adaptRoute(signInController))

}
