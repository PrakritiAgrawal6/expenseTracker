import { Config } from "jest";

const config: Config = {
  // collectCoverage: true,
  // collectCoverageFrom: ["src/**/*.{ts,tsx}", "!src/**/*.d.ts", "!**/vendor/**"],
  // coverageDirectory: "coverage",
  testEnvironment: "jsdom",
  transform: {
    ".(ts|tsx)": ["ts-jest", { tsconfig: "tsconfig.app.json" }],
  },
  coverageReporters: ["lcov"],
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/coverage",
    "package.json",
    "package-lock.json",
    "pnpm-lock.json",
    "yarn-lock.json", //remove lock file accoding to your package manager
    "jest.setup.ts",
  ],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "\\.css$": "<rootDir>/src/__test__/__mocks__/styleMock.ts",
  },
};

module.exports = config;
