import { PrismaClient } from '@prisma/client'

const DB = new PrismaClient({
  datasources: {
    db: {
      // url: ':memory:'
      url: process.env.DB_URL,
    },
  },
})

export default DB


