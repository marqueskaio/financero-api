import request from 'supertest'
import app from '../config/app'
import {DbTableTruncate} from "../../tests/helpers/db-table-truncate";
import DB from "../../databases";
import {mockModelUser} from "../../tests/factories/user-model-factory";
import {mockAccessToken} from "../../tests/helpers/mock-access-token";

let accessToken: string

describe('User Routes', () => {
  beforeAll(async () => {
  })
  beforeEach(async () => {
    await DbTableTruncate('users', DB)
  })

  describe('GET /user', () => {
    test('Should return status code 200', async () => {
      accessToken = await mockAccessToken('admin')
      await DB.usersModel.create({
        data: mockModelUser({name: 'Other name', id: 2})
      })

      await request(app)
        .get('/api/user')
        .set("x-access-token", accessToken)
        .expect(200).then(result => {
          expect(result.body.length).toEqual(2)
          expect(result.body[0].name).toEqual('Paulo Victor')
          expect(result.body[1].name).toEqual('Other name')
        })
    })
  })

  describe('POST /user', () => {
    test('Should return status code 200', async () => {
      accessToken = await mockAccessToken('admin')
      await DB.usersModel.create({
        data: mockModelUser({name: 'Other name', id: 2})
      })

      await request(app)
        .post('/api/user')
        .set("x-access-token", accessToken)
        .send({name: 'Paulo', email: 'paulo@mail.com', password: 'paulo', role: 'admin'})
        .expect(200).then(result => {
          expect(result.body.name).toEqual('Paulo')
        })
    })
    test('Should return status code 422 on missing name', async () => {
      accessToken = await mockAccessToken('admin')
      await DB.usersModel.create({
        data: mockModelUser({name: 'Other name', id: 2})
      })

      await request(app)
        .post('/api/user')
        .set("x-access-token", accessToken)
        .send({email: 'paulo@mail.com', password: 'paulo', role: 'admin'})
        .expect(400)
    })
  })

  describe('GET /user/me', () => {
    test('Should return status code 200', async () => {
      accessToken = await mockAccessToken('admin')

      await request(app)
        .get('/api/user/me')
        .set("x-access-token", accessToken)
        .expect(200).then(result => {
          expect(result.body.name).toEqual('Paulo Victor')
        })
    })
  })
})
