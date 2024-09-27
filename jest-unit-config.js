const config = require('./jest.config.cjs')
config.testMatch = ['**/*.spec.ts']
process.env.DB_URL = "mysql://root:Melsonbr@1@localhost:3306/db_financero_test"
module.exports = config
