import {Router} from "express";
import {adaptRoute} from "../adapters/express-routes-adapter";
import {createIncomesController} from "../factories/incomes-create-factory";
import {auth} from "../middlewares/auth";

export default (router: Router): void => {
  router.post('/incomes', auth, adaptRoute(createIncomesController))

  router.get('/incomes/:id', auth, adaptRoute(createIncomesController))

  router.put('/incomes/:id', auth, adaptRoute(createIncomesController))

  router.delete('/incomes/:id', auth, adaptRoute(createIncomesController))

}

