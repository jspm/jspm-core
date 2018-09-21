const jspmPlugin = require('../../rollup-plugin-jspm');

export default {
  experimentalCodeSplitting: true,
  input: ['@empty.js', '@empty.dew.js', 'assert', 'buffer', 'console', 'constants', 'crypto', 'domain', 'events', 'http', 'https', 'os', 'path', 'process', 'punycode', 'querystring', 'stream', 'string_decoder', 'sys', 'timers', 'tty', 'url', 'util', 'vm', 'zlib'],
  output: {
    dir: '../',
    format: 'esm'
  },
  plugins: [jspmPlugin({
    env: {
      browser: true
    },
    browserBuiltins: __dirname
  })]
};