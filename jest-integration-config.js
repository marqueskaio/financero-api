const config = require('./jest.config.cjs')
config.testMatch = ['**/*.test.ts']
process.env.DB_URL = "mysql://root:88153833j@localhost:3306/db_financero_test"
module.exports = config
