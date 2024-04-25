/** @type {import('jest').Config} */
const config = {
  // The test environment that will be used for testing
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.(css|less)$": "identity-obj-proxy",
  },
  setupFilesAfterEnv: ["./jest.setup.js"],
};

export default config;
