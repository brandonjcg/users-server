import type { Config } from 'jest';

const config: Config = {
  bail: 5,
  collectCoverage: true,
  collectCoverageFrom: [
    '!<rootDir>/index.ts',
  ],
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: [
    '/node_modules/',
    'jest.config.ts',
  ],
  coverageProvider: 'v8',
  coverageReporters: [
    'json',
    'text',
    'lcov',
  ],
  maxWorkers: 1,
  moduleDirectories: ['node_modules'],
  moduleFileExtensions: ['ts', 'js'],
  slowTestThreshold: 5,
  verbose: true,
  watchman: true,
};

export default config;
