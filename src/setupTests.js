// 1. Jest DOM extend
import '@testing-library/jest-dom';

// 2. Node.js core polyfills
import { TextEncoder, TextDecoder } from 'util';
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// 3. Web Streams API polyfill
import { ReadableStream } from 'web-streams-polyfill/ponyfill/es2018';
global.ReadableStream = ReadableStream;

// 4. Fetch polyfill
if (typeof global.fetch === 'undefined') {
  global.fetch = require('node-fetch');
}

// 5. Firebase test environment flag
process.env.FIREBASE_EMULATORS = 'true';

// 6. JSDOM environment setup
const { JSDOM } = require('jsdom');
const dom = new JSDOM('<!doctype html><html><body></body></html>');
global.window = dom.window;
global.document = dom.window.document;
global.navigator = dom.window.navigator;
