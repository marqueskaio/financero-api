import { DbTableTruncate } from "../../tests/helpers/db-table-truncate"
import { IncomesRepository } from "./incomes-repository"
import DB from "../../databases"
import {mockModelIncomeData, mockModelIncomeParams} from "../../tests/data/mock-incomes-model";

describe('IncomesRepository', () => {

    beforeEach(() => {
         DbTableTruncate('incomes', DB)
    })

    test('should create and return an income', async () => {
        const sut = new IncomesRepository()
        const result = await sut.create(mockModelIncomeParams())
        expect(result).toEqual(mockModelIncomeData())
    })
})
