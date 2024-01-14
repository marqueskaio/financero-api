import request from 'supertest'

import app from '../config/app'
describe('Cors Middleware', () => {
  test('Should enable cors', async () => {
    app.get('/test_cores', (req, res) => {
      res.send()
    })
    await request(app)
      .get('/test_cores')
      .expect('access-control-allow-origin', '*')
      .expect('access-control-allow-methods', '*')
      .expect('access-control-allow-allow-headers', '*')
  })
})
