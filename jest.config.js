const _ = require('lodash')
// 使用随机端口以支持 Jest 多实例运行，如提交前 lint 的时候。
process.env.MOCK_API_PORT = process.env.MOCK_API_PORT || _.random(9000, 9999)

module.exports = {
  setupFiles: ['<rootDir>/tests/unit/setup'],
  globalSetup: '<rootDir>/tests/unit/global-setup',
  globalTeardown: '<rootDir>/tests/unit/global-teardown',
  setupTestFrameworkScriptFile: '<rootDir>/tests/unit/matchers',
  testMatch: ['**/(*.)unit.js'],
  moduleFileExtensions: ['js', 'json', 'vue'],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.js$': 'babel-jest'
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    // Transform any static assets to empty strings
    '\\.(jpe?g|png|gif|webp|svg|mp4|webm|ogg|mp3|wav|flac|aac|woff2?|eot|ttf|otf)$':
      '<rootDir>/tests/unit/fixtures/empty-string.js'
  },
  snapshotSerializers: ['jest-serializer-vue'],
  coverageDirectory: '<rootDir>/tests/unit/coverage',
  collectCoverageFrom: [
    'src/**/*.{js,vue}',
    '!**/node_modules/**',
    '!src/main.js',
    '!src/App.vue',
    '!src/router/**',
    '!src/store/index.js',
    '!src/store/mutationTypes.js',
    '!src/store/modules/index.js',
    '!src/utils/get-authorization.js',
    '!src/utils/request.js'
  ],
  // https://facebook.github.io/jest/docs/zh-Hans/configuration.html#testurl-string
  // Set the `testURL` to a provided base URL if one exists, or the mock API base URL
  // Solves: https://stackoverflow.com/questions/42677387/jest-returns-network-error-when-doing-an-authenticated-request-with-axios
  testURL:
    process.env.API_BASE_URL || `http://localhost:${process.env.MOCK_API_PORT}`,
  globals: {
    'vue-jest': {
      // Disable CSS compilation until it's more stable
      experimentalCSSCompile: false
    }
  }
}
