import { Prisma, PrismaClient } from '@prisma/client'

export const DbTableTruncate = async (table: string, client: PrismaClient): Promise<any> => {

  await client.$executeRaw(Prisma.raw(`TRUNCATE TABLE ${table};`))
  return
}
export const DbDisableConstraint = async (client: PrismaClient): Promise<any> => {

  await client.$executeRaw(Prisma.raw(`SET FOREIGN_KEY_CHECKS = 0;`))
  return
}
