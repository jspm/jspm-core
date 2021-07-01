import jspmPlugin from 'rollup-plugin-jspm';

const input = {
  '@empty': './build/@empty.js',
  '@empty.dew': './build/@empty.dew.js',
  assert: './node_modules/assert',
  buffer: 'buffer',
  console: 'console',
  constants: 'constants',
  crypto: 'crypto',
  domain: 'domain',
  events: 'events',
  http: 'http',
  https: 'https',
  os: 'os',
  path: 'path',
  process: 'process',
  'process-production': './build/process-production.js',
  punycode: 'punycode',
  querystring: 'querystring',
  stream: 'stream',
  string_decoder: 'string_decoder',
  sys: 'util',
  timers: 'timers',
  tty: 'tty',
  url: 'url',
  util: 'util',
  vm: 'vm',
  zlib: 'zlib'
};

export default {
  input,
  output: {
    dir: 'nodelibs',
    format: 'esm'
  },
  plugins: [{
    resolveId (name, parent) {
      // load all builtins as these root inputs
      if (parent && name in input)
        return this.resolveId(name, undefined);
    }
  }, jspmPlugin({
    env: { browser: true }
  })]
};
