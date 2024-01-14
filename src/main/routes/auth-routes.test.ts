import request from 'supertest'

import app from '../config/app'
import { hash } from 'bcrypt'
import {DbTableTruncate} from "../../tests/helpers/db-table-truncate";
import DB from "../../databases";

describe('Login Routes', () => {
  beforeAll(async () => {
  })
  beforeEach(async () => {
    await DbTableTruncate('users', DB)
  })

  describe('POST /signup', () => {
    test('Should return status code 200 on signup', async () => {
      await request(app)
        .post('/api/sign-up/admin')
        .send({
          name: 'Paulo Victor',
          email: 'paulo@rockapps.com.br',
          password: 'paulo'
        })
        .expect(200).then(result => {
          expect(result.body.email).toEqual('paulo@rockapps.com.br')
          expect(result.body.name).toEqual('Paulo Victor')
          expect(result.body.password).toBeTruthy()
          expect(result.body.accessToken).toBeTruthy()
          expect(result.body.role).toEqual('admin')
        })
    })
  })
  describe('POST /login', () => {
    test('Should return status code 200 on login', async () => {
      const passwordHashed = await hash('paulo', 12)
      await DB.usersModel.create({
        data: {
          name: 'Paulo Victor',
          email: 'paulo.telles@rockapps.com.br',
          password: passwordHashed,
          role: 'admin'
        }
      })
      await request(app)
        .post('/api/sign-in/admin')
        .send({
          email: 'paulo.telles@rockapps.com.br',
          password: 'paulo'
        })
        .expect(200).then(result => {
          expect(result.body.email).toEqual('paulo.telles@rockapps.com.br')
          expect(result.body.name).toEqual('Paulo Victor')
          expect(result.body.password).toBeTruthy()
          expect(result.body.accessToken).toBeTruthy()
          expect(result.body.role).toEqual('admin')
        })
    })
    test('Should return status code 401 when login fail', async () => {
      await request(app)
        .post('/api/sign-in/admin')
        .send({
          email: 'paulo.telles@rockapps.com.br',
          password: 'paulo'
        })
        .expect(401)
    })
  })
})
