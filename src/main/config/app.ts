import express from 'express'
import setupMiddlewares from './middlewares'
import setupRoutes from './routes'
import setupSwagger from './config-swagger'

const app = express()
setupSwagger(app)
app.use(express.json())
setupMiddlewares(app)
setupRoutes(app)
export default app
