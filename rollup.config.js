import jspmPlugin from 'rollup-plugin-jspm';

export default [{
  input: ['build/@empty.js', 'build/@empty.dew.js', 'assert', 'buffer', 'console', 'constants', 'crypto', 'domain', 'events', 'http', 'https', 'os', 'path', 'process', 'build/process-production.js', 'punycode', 'querystring', 'stream', 'string_decoder', 'sys', 'timers', 'tty', 'url', 'util', 'vm', 'zlib'],
  output: {
    dir: 'nodelibs',
    format: 'esm'
  },
  plugins: [jspmPlugin({
    env: { browser: true }
  })]
}, {
  input: ['@jspm/jspm-resolve/resolve.js'],
  output: {
    dir: '.',
    format: 'esm'
  },
  plugins: [jspmPlugin({
    env: { node: true }
  })]
}];
