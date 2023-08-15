const customJestConfig = {
  setupFiles: ["./jest.envSetup.js"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jest-environment-jsdom",
  preset: "ts-jest",
  testMatch: ["**/test/**/*.test.ts", "**/test/**/*.test.tsx"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": ["babel-jest", { presets: ["next/babel"] }]
  },
  moduleNameMapper: {
    "\\.(css|less)$": "identity-obj-proxy",
    "^\\$constants/(.*)$": "<rootDir>/src/constants/$1",
    "^\\$context/(.*)$": "<rootDir>/src/context/$1",
    "^\\$components/(.*)$": "<rootDir>/src/components/$1",
    "^\\$helpers/(.*)$": "<rootDir>/src/helpers/$1",
    "^\\$hooks/(.*)$": "<rootDir>/src/hooks/$1",
    "^\\$stores/(.*)$": "<rootDir>/src/stores/$1",
    "^\\$styles/(.*)$": "<rootDir>/src/styles/$1",
    "^\\$types/(.*)$": "<rootDir>/src/types/$1",
    "^\\$i18n/(.*)$": "<rootDir>/src/i18n/$1"
  },
  coverageThreshold: {
    global: {
      // ? Adjust the percentage of coverage to the desired level
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0
    }
  },
  collectCoverageFrom: [
    "<rootDir>/src/hooks/**/*.{ts,tsx}",
    "<rootDir>/src/helpers/**/*.{ts,tsx}",
    "<rootDir>/src/stores/**/*.{ts,tsx}",
    "<rootDir>/src/utils/**/*.{ts,tsx}"
  ]
}

module.exports = customJestConfig
