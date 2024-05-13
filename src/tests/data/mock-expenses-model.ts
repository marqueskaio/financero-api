import {ExpensesModel} from "@prisma/client";

export function mockModelExpensesParams(data:any = {}): ExpensesModel{
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

export function mockModelExpensesData(data: any = {}): ExpensesModel{
    return mockModelExpensesParams({id: 1, ...data})
}
