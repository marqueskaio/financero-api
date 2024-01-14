import { type Router } from 'express'
import {adaptRoute} from "../adapters/express-routes-adapter";
import {controller} from "../factories/user-create-factory";
import {userLoadController} from "../factories/user-load-factory";
import {auth} from "../middlewares/auth";
import {userMeController} from "../factories/user-me-factory";

export default (router: Router): void => {
  router.get('/user/me', auth, adaptRoute(userMeController))
  router.post('/user', adaptRoute(controller))
  router.get('/user', auth, adaptRoute(userLoadController))

}
