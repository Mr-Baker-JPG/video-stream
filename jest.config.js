module.exports = {
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
  moduleNameMapper: {
    "styles/(.*)": "<rootDir>/styles/$1",
    "components/(.*)": "<rootDir>/components/$1",
  },
  moduleDirectories: ["node_modules", "components"],
}
