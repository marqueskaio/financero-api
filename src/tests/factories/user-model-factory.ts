import {UsersModel} from '@prisma/client'

export function mockModelUserParams (data: any = {}): UsersModel {
  return {
    name: 'any_name',
    email: 'any_email',
    password: 'any_password',
    role: 'admin',
    accessToken: null,
    ...data
  }
}

export function mockModelUser (data: any = {}): UsersModel {
  return mockModelUserParams({id: 1, ...data})
}