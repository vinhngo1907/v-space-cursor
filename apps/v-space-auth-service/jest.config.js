/* eslint-disable no-undef */
/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>/src'],
    moduleNameMapper: {
        '@app/(.*)': '<rootDir>/src/application/$1',
    },
    testMatch: ['<rootDir>/src/**/__tests__/**/?(*.)+(spec|test).[jt]s'],
};
