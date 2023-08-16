module.exports = {
  preset: 'ts-jest/presets/js-with-babel-esm',
  testEnvironment: 'node',
  moduleFileExtensions: ['tsx', 'ts', 'js'],
  verbose: true,
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.jest.json',
      isolatedModules: true,
    },
  },
  rootDir: './',
  testMatch: ['<rootDir>/src/**/*.test.ts'],
  moduleNameMapper: {
    '^~(.*)$': '<rootDir>/src/$1',
    '@prisma-generated': '<rootDir>/prisma/__generated__',
  },
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
};
