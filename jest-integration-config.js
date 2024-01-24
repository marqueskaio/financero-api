const config = require('./jest.config.cjs')
config.testMatch = ['**/*.test.ts']
process.env.DB_URL = "mysql://root:Aa.1793258456789@localhost:3306/db_financero_test"
module.exports = config
