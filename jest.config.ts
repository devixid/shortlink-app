import nextJest from "next/jest";

const createJestConfig = nextJest({
  dir: "./"
});

const config = {
  moduleDirectories: ["node_modules", "<rootDir>/"],
  moduleNameMapper: {
    "@/(.*)$": "<rootDir>/src/$1"
  },
  testEnvironment: "jest-environment-jsdom"
};

export default createJestConfig(config);
