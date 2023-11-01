/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  collectCoverage: true,
  testEnvironment: 'node',
  testPathIgnorePatterns: [
    "/node_modules/", "/dist/"
  ],
  coveragePathIgnorePatterns: [
    "/node_modules/", "/dist/"
  ]
};