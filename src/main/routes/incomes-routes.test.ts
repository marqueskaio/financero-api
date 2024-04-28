import {DbTableTruncate} from "../../tests/helpers/db-table-truncate";
import DB from "../../databases";
import request from "supertest";
import app from "../config/app";
import {mockModelIncomeData, mockModelIncomeParams} from "../../tests/factories/mock-incomes-model";
import {mockAccessToken} from "../../tests/helpers/mock-access-token";

let accessToken: string

describe('Incomes Routes', () => {
    beforeEach(async () => {
        await DbTableTruncate('incomes', DB)
    })
    describe('POST /incomes', () => {
        test('should return 200 on create incomes', async () => {
            accessToken = await mockAccessToken("admin")
            await request(app)
                .post('/api/incomes')
                .set('x-access-token', accessToken)
                .send(mockModelIncomeParams({}))
                .expect(200).then(result => {
                    expect(result.body).toEqual(mockModelIncomeData())
                })
        })
    })
})
