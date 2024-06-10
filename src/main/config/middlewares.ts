import express, { type Express } from 'express'
import { bodyParser, contentType } from '../middlewares'
import cors from 'cors'

export default (app: Express): void => {
  app.use(bodyParser)
  app.use(cors())
  app.use(contentType)
  app.use(express.json({limit: '500mb'}));
  app.use(express.urlencoded({limit: '500mb'}));
}
