module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  testPathIgnorePatterns: [
    "/node_modules/",
    "<rootDir>/src/App.test.js"
  ],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy', 
  },
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
};
