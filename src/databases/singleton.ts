import { PrismaClient } from '@prisma/client'
import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended'

import prisma from './index'

jest.mock('./index', () => ({
  __esModule: true,
  mockDeep: mockDeep<PrismaClient>(),
  default: mockDeep<PrismaClient>(),
}))

// beforeEach(() => {
//   mockReset(prismaMock)
// })

const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>
export default prismaMock