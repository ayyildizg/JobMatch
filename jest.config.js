module.exports = {
  testEnvironment: 'jsdom',
  setupFiles: ['./jest.polyfills.js'],
  setupFilesAfterEnv: ['./src/setupTests.js'],
  transformIgnorePatterns: [
    "node_modules/(?!(@firebase|firebase)/)"
  ],
  globals: {
    ReadableStream: true,
    TextEncoder: true,
    TextDecoder: true
  }
}
