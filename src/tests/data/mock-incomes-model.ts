import {IncomesModel} from '@prisma/client'

export function mockModelIncomeParams (data: any = {}): IncomesModel {
    return {
        value: 9,
        description: 'any_description',
        data: "",
        category: null,
        created_at: null,
        deleted_at: null,
        ...data
    }
}

export function mockModelIncomeData (data: any = {}): IncomesModel {
    return mockModelIncomeParams({id: 1, ...data})
}
