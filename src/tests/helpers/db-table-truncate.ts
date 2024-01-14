import { Prisma, PrismaClient } from '@prisma/client'

export const DbTableTruncate = async (table: string, client: PrismaClient): Promise<any> => {

  const sql = Prisma.raw(`TRUNCATE TABLE ${table};`)

  return client.$executeRaw(sql)
}
