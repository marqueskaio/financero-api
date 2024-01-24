import { DbTableTruncate } from "../../../tests/helpers/db-table-truncate"
import { IncomesRepository } from "./incomes-repository"
import DB from "../../../databases"

describe('IncomesRepository', () => {

    beforeEach(async() => {
        await DbTableTruncate('incomes', DB)
    })

    test('should create and return an income', async () => {
        const sut = new IncomesRepository
        const result = await sut.create({value: 100, description: 'carne', category: 'mercado'})
        expect(result).toEqual({id:1, value: 100, description: 'carne', category: 'mercado'})
    })
})