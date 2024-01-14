module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/main/**',
    '!<rootDir>/src/tests/**',
    '!<rootDir>/src/helpers/**',
    '!<rootDir>/src/databases/**',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'html'],
  coverageProvider: 'babel',
  // testEnvironment: 'node',
  // preset: 'ts-jest',
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
}
