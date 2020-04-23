function unimplemented () {
  throw new Error('Node.js module module is not supported by jspm core' + (typeof Deno !== 'undefined' ? '. Deno support here is tracking in https://github.com/jspm/jspm-core/issues/4, +1\'s are appreciated!' : ' in the browser'));
}

var builtinModules = [
  'buffer',
  'child_process',
  'cluster',
  'console',
  'constants',
  'crypto',
  'dgram',
  'dns',
  'domain',
  'events',
  'fs',
  'http',
  'https',
  'module',
  'net',
  'os',
  'path',
  'process',
  'punycode',
  'querystring',
  'readline',
  'repl',
  'stream',
  'string_decoder',
  'sys',
  'timers',
  'tls',
  'tty',
  'url',
  'util',
  'vm',
  'zlib'
];

export default {
  builtinModules: builtinModules,
  _cache: null,
  _pathCache: null,
  _extensions: null,
  globalPaths: null,
  _debug: unimplemented,
  _findPath: unimplemented,
  _nodeModulePaths: unimplemented,
  _resolveLookupPaths: unimplemented,
  _load: unimplemented,
  _resolveFilename: unimplemented,
  createRequireFromPath: unimplemented,
  createRequire: unimplemented,
  _initPaths: unimplemented,
  _preloadModules: unimplemented,
  syncBuiltinESMExports: unimplemented,
  Module: unimplemented,
  runMain: unimplemented,
  findSourceMap: unimplemented,
  SourceMap: unimplemented
};

export var _cache = null,
  _pathCache = null,
  _extensions = null,
  globalPaths = null;

export {
  builtinModules,
  unimplemented as _debug,
  unimplemented as _findPath,
  unimplemented as _nodeModulePaths,
  unimplemented as _resolveLookupPaths,
  unimplemented as _load,
  unimplemented as _resolveFilename,
  unimplemented as createRequireFromPath,
  unimplemented as createRequire,
  unimplemented as _initPaths,
  unimplemented as _preloadModules,
  unimplemented as syncBuiltinESMExports,
  unimplemented as Module,
  unimplemented as runMain,
  unimplemented as findSourceMap,
  unimplemented as SourceMap
}
