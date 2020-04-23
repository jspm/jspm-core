function unimplemented () {
  throw new Error('Node.js module module is not supported by jspm core' + (typeof Deno !== 'undefined' ? '. Deno support here is tracking in https://github.com/jspm/jspm-core/issues/4, +1\'s are appreciated!' : ' in the browser'));
}

export default {
  builtinModules: null,
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

export var builtinModules = null,
  _cache = null,
  _pathCache = null,
  _extensions = null,
  globalPaths = null;

export {
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
