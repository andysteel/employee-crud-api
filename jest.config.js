const { resolve } = require('path');

const root = resolve(__dirname);
module.exports = {
  rootDir: root,
  displayName: 'root-tests',
  testMatch: ['<rootDir>/src/**/*.test.ts'],
  testEnvironment: 'node',
  clearMocks: true,
  preset: 'ts-jest',
  moduleNameMapper: {
    '@config/(.*)': '<rootDir>/src/config/$1',
    '@controllers/(.*)': '<rootDir>/src/controllers/$1',
    '@models/(.*)': '<rootDir>/src/models/$1',
    '@repositories/(.*)': '<rootDir>/src/repositories/$1',
    '@util/(.*)': '<rootDir>/src/util/$1',
    '@test/(.*)': '<rootDir>/test/$1',
  },
};
