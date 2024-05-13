import {DbTableTruncate} from "../../tests/helpers/db-table-truncate";
import {ExpensesRepository} from "./expenses-repository";
import {mockModelExpensesData, mockModelExpensesParams} from "../../tests/data/mock-expenses-model";
import DB from "../../databases";

describe('ExpensesRepository', () => {
    beforeEach(() => {
        DbTableTruncate('expenses', DB)
    })

    test('should create and return an expense', async () => {
        const sut = new ExpensesRepository()
        const result = await sut.create(mockModelExpensesParams())
        expect(result).toEqual(mockModelExpensesData())
    })
})
