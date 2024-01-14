import swaggerConfig from '../docs'
import { type Express } from 'express'
import { serve, setup } from 'swagger-ui-express'
import { noCache } from '../middlewares/no-cache'
export default (app: Express): void => {
  app.use('/api-docs', noCache, serve, setup(swaggerConfig))
}
