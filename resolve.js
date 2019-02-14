import _url from 'url';
import _fs from 'fs';
import _process from 'process';

var exports$1 = {},
    _dewExec = false;
function dew() {
  if (_dewExec) return exports$1;
  _dewExec = true;
  var process = _process;
  const {
    URL
  } = _url;
  const fs = _fs;
  const isWindows = process.platform === 'win32';
  const winSepRegEx = /\\/g;
  const encodedSepRegEx = /%(5C|2F)/gi;
  const seenCacheAndEnv = new WeakMap();

  function throwModuleNotFound(name, parent) {
    let e = new Error(`Cannot find module ${name}${parent ? ` from ${parent}` : ''}.`);
    e.code = 'MODULE_NOT_FOUND';
    throw e;
  }

  function throwURLName(name) {
    let e = new Error(`URL ${name} is not a valid file:/// URL to resolve.`);
    e.code = 'MODULE_NAME_URL_NOT_FILE';
    throw e;
  }

  function throwInvalidModuleName(msg) {
    let e = new Error(msg);
    e.code = 'INVALID_MODULE_NAME';
    throw e;
  }

  function throwInvalidConfig(msg) {
    let e = new Error(msg);
    e.code = 'INVALID_CONFIG';
    throw e;
  }

  const packageRegEx = /^([a-z]+:(?:@[\-_\.a-zA-Z\d]+\/)?[-_\.a-zA-Z\d]+@[^@<>:"/\|?*^\u0000-\u001F]+)(\/[\s\S]*|$)/;

  function parsePackageName(name) {
    const packageMatch = name.match(packageRegEx);
    if (packageMatch) return {
      name: packageMatch[1],
      path: packageMatch[2]
    };
  }

  const packagePathRegEx = /^([a-z]+\/(?:@[-_\.a-zA-Z\d]+\/)?[-_\.a-zA-Z\d]+@[^@<>:"/\|?*^\u0000-\u001F]+)(\/[\s\S]*|$)/;

  function parsePackagePath(path, jspmProjectPath) {
    const jspmPackagesPath = jspmProjectPath + '/jspm_packages';
    if (!path.startsWith(jspmPackagesPath) || path[jspmPackagesPath.length] !== '/' && path.length !== jspmPackagesPath.length) return;
    const packageMatch = path.substr(jspmPackagesPath.length + 1).match(packagePathRegEx);
    if (packageMatch) return {
      name: packageMatch[1].replace('/', ':'),
      path: packageMatch[2]
    };
  }

  function packageToPath(pkgName, jspmProjectPath) {
    const registryIndex = pkgName.indexOf(':');
    return jspmProjectPath + '/jspm_packages/' + pkgName.substr(0, registryIndex) + '/' + pkgName.substr(registryIndex + 1);
  }

  function percentDecode(path) {
    if (path.match(encodedSepRegEx)) throwInvalidModuleName(`${path} cannot be URI decoded as it contains a percent-encoded separator or percent character.`);
    if (path.indexOf('%') === -1) return path;
    return decodeURIComponent(path);
  }

  function tryParseUrl(url) {
    try {
      return new URL(url);
    } catch (e) {}
  } // path is an absolute file system path with . and .. segments to be resolved
  // works only with /-separated paths


  function resolvePath(path) {
    // linked list of path segments
    let headSegment = {
      prev: undefined,
      next: undefined,
      segment: undefined
    };
    let curSegment = headSegment;
    let segmentIndex = 0;

    for (var i = 0; i < path.length; i++) {
      // busy reading a segment - only terminate on '/'
      if (segmentIndex !== -1) {
        if (path[i] === '/') {
          let nextSegment = {
            segment: path.substring(segmentIndex, i + 1),
            next: undefined,
            prev: curSegment
          };
          curSegment.next = nextSegment;
          curSegment = nextSegment;
          segmentIndex = -1;
        }

        continue;
      } // new segment - check if it is relative


      if (path[i] === '.') {
        // ../ segment
        if (path[i + 1] === '.' && path[i + 2] === '/') {
          curSegment = curSegment.prev || curSegment;
          curSegment.next = undefined;
          i += 2;
        } // ./ segment
        else if (path[i + 1] === '/') {
            i += 1;
          } else {
            // the start of a new segment as below
            segmentIndex = i;
            continue;
          } // trailing . or .. segment


        if (i === path.length) {
          let nextSegment = {
            segment: '',
            next: undefined,
            prev: curSegment
          };
          curSegment.next = nextSegment;
          curSegment = nextSegment;
        }

        continue;
      } // it is the start of a new segment


      segmentIndex = i;
    } // finish reading out the last segment


    if (segmentIndex !== -1) {
      if (path[segmentIndex] === '.') {
        if (path[segmentIndex + 1] === '.') {
          curSegment = curSegment.prev || curSegment;
          curSegment.next = undefined;
        } // not a . trailer
        else if (segmentIndex + 1 !== path.length) {
            let nextSegment = {
              segment: path.substr(segmentIndex),
              next: undefined,
              prev: curSegment
            };
            curSegment.next = nextSegment;
          }
      } else {
        let nextSegment = {
          segment: path.substr(segmentIndex),
          next: undefined,
          prev: curSegment
        };
        curSegment.next = nextSegment;
      }
    }

    curSegment = headSegment;
    let outStr = '';

    while (curSegment = curSegment.next) outStr += curSegment.segment;

    return outStr;
  }

  const defaultEnv = {
    browser: false,
    node: true,
    production: false,
    dev: true,
    'react-native': false,
    electron: false,
    module: true,
    default: true
  };

  function setDefaultEnv(env) {
    if (typeof env.browser === 'boolean') {
      if (typeof env.node !== 'boolean') env.node = !env.browser;
    } else if (typeof env.node === 'boolean') {
      env.browser = !env.node;
    }

    if (typeof env.production === 'boolean') {
      env.dev = !env.production;
    } else if (typeof env.dev === 'boolean') {
      env.production = !env.dev;
    }

    env.default = true;
    seenCacheAndEnv.set(env, true);
  }

  const relRegex = /^(\/|\.\.?\/)/;
  const dotSegmentRegex = /(^|\/)\.\.?(\/|$)/;

  function validatePlain(name) {
    if (name.indexOf('\\') !== -1) throwInvalidModuleName(`Package request ${name} must use "/" as a separator not "\".`);
    let urlLike = false;
    const protocolIndex = name.indexOf(':');

    if (protocolIndex !== -1) {
      const sepIndex = name.indexOf('/');
      urlLike = sepIndex === -1 || sepIndex > protocolIndex;
    }

    if (urlLike || name.match(relRegex) || name.match(dotSegmentRegex)) throwInvalidModuleName(`Package request ${name} is not a valid plain specifier name.`);
  }

  function initCache(cache) {
    if (cache.jspmConfigCache === undefined) cache.jspmConfigCache = {};
    if (cache.pjsonConfigCache === undefined) cache.pjsonConfigCache = {};
    if (cache.isFileCache === undefined) cache.isFileCache = {};
    if (cache.isDirCache === undefined) cache.isDirCache = {};
    seenCacheAndEnv.set(cache, true);
  }

  function hasWinDrivePrefix(name) {
    if (name[1] !== ':') return false;
    const charCode = name.charCodeAt(0);
    return charCode > 64 && charCode < 90 || charCode > 96 && charCode < 123;
  }

  async function resolve(name, parentPath, {
    env,
    cache,
    utils = resolveUtils,
    cjsResolve = false,
    browserBuiltins = undefined // when env.browser is set, resolves builtins to this directory

  } = {}) {
    // necessary for bins to not have extensions
    let isMain = false;

    if (!parentPath) {
      parentPath = process.cwd() + '/';
      isMain = true;
    }

    if (parentPath.indexOf('\\') !== -1) parentPath = parentPath.replace(winSepRegEx, '/');
    if (cache && seenCacheAndEnv.has(cache) === false) initCache(cache);

    if (env) {
      if (seenCacheAndEnv.has(env) === false) setDefaultEnv(env);
    } else {
      env = defaultEnv;
    }

    const jspmProjectPath = await utils.getJspmProjectPath(parentPath, cache);
    const relativeResolved = await relativeResolve.call(utils, name, parentPath, jspmProjectPath, cjsResolve, isMain, env, cache);
    if (relativeResolved) return relativeResolved; // not a jspm project -> node_modules resolve

    if (!jspmProjectPath) return nodeModulesResolve.call(utils, name, parentPath, cjsResolve, env, cache);
    validatePlain(name);
    const {
      pkg: parentPkg,
      pkgPath: parentPkgPath,
      pkgConfig: parentPkgConfig
    } = await getPackageConfig.call(utils, parentPath, jspmProjectPath, cache); // parent package map configuration

    if (parentPkgConfig && parentPkgConfig.map) {
      const mapped = applyMap(name, parentPkgConfig.map, env);

      if (mapped !== undefined) {
        if (mapped.startsWith('./')) {
          const resolved = parentPkgPath + mapped.substr(1);

          if (cjsResolve) {
            const realpath = !jspmProjectPath || !resolved.startsWith(jspmProjectPath) || resolved[jspmProjectPath.length] !== '/';
            return nodeFinalizeResolve.call(utils, resolved, parentPath, false, realpath, isMain, cache);
          }

          return finalizeResolve.call(utils, resolved, jspmProjectPath, cjsResolve, isMain, cache);
        }

        validatePlain(name = mapped);
      }
    } // jspm lock file resolution


    const jspmProjectResolved = await jspmProjectResolve.call(utils, name, parentPkg, parentPkgConfig, jspmProjectPath, cjsResolve, isMain, env, cache);
    if (jspmProjectResolved) return jspmProjectResolved; // builtins

    const builtinResolved = builtinResolve(name, env.browser ? browserBuiltins : undefined);
    if (builtinResolved) return builtinResolved;
    throw throwModuleNotFound(name, parentPath);
  }

  function resolveSync(name, parentPath, {
    env,
    cache,
    utils = resolveUtils,
    cjsResolve = false,
    browserBuiltins = undefined // when env.browser is set, resolves builtins to this directory

  } = {}) {
    // necessary for bins to not have extensions
    let isMain = false;

    if (!parentPath) {
      parentPath = process.cwd() + '/';
      isMain = true;
    }

    if (parentPath.indexOf('\\') !== -1) parentPath = parentPath.replace(winSepRegEx, '/');
    if (cache && seenCacheAndEnv.has(cache) === false) initCache(cache);

    if (env) {
      if (seenCacheAndEnv.has(env) === false) setDefaultEnv(env);
    } else {
      env = defaultEnv;
    }

    const jspmProjectPath = utils.getJspmProjectPathSync(parentPath, cache);
    const relativeResolved = relativeResolveSync.call(utils, name, parentPath, jspmProjectPath, cjsResolve, isMain, env, cache);
    if (relativeResolved) return relativeResolved; // not a jspm project -> node_modules resolve

    if (!jspmProjectPath) return nodeModulesResolve.call(utils, name, parentPath, cjsResolve, env, cache);
    validatePlain(name);
    const {
      pkg: parentPkg,
      pkgPath: parentPkgPath,
      pkgConfig: parentPkgConfig
    } = getPackageConfigSync.call(utils, parentPath, jspmProjectPath, cache); // parent package map configuration

    if (parentPkgConfig && parentPkgConfig.map) {
      const mapped = applyMap(name, parentPkgConfig.map, env);

      if (mapped !== undefined) {
        if (mapped.startsWith('./')) {
          const resolved = parentPkgPath + mapped.substr(1);

          if (cjsResolve) {
            const realpath = !jspmProjectPath || !resolved.startsWith(jspmProjectPath) || resolved[jspmProjectPath.length] !== '/';
            return nodeFinalizeResolve.call(utils, resolved, parentPath, false, realpath, isMain, cache);
          }

          return finalizeResolveSync.call(utils, resolved, jspmProjectPath, cjsResolve, isMain, cache);
        }

        validatePlain(name = mapped);
      }
    } // jspm lock file resolution


    const jspmProjectResolved = jspmProjectResolveSync.call(utils, name, parentPkg, parentPkgConfig, jspmProjectPath, cjsResolve, isMain, env, cache);
    if (jspmProjectResolved) return jspmProjectResolved; // builtins

    const builtinResolved = builtinResolve(name, env.browser ? browserBuiltins : undefined);
    if (builtinResolved) return builtinResolved;
    throw throwModuleNotFound(name, parentPath);
  }

  async function relativeResolve(name, parentPath, jspmProjectPath, cjsResolve, isMain, env, cache) {
    let resolved;

    if (name[0] === '/') {
      name = name.replace(winSepRegEx, '/');

      if (name[1] === '/') {
        if (name[2] === '/') throwInvalidModuleName(`${name} is not a valid module name.`);else resolved = resolvePath(percentDecode(name.substr(1 + isWindows)));
      } else {
        let path = isWindows ? name.substr(1) : name;
        if (isWindows && !hasWinDrivePrefix(path)) path = name;
        resolved = resolvePath(percentDecode(path));
      }
    } // Relative path
    else if (name[0] === '.' && (name.length === 1 || name[1] === '/' && (name = name.substr(2), true) || name[1] === '.' && (name.length === 2 || name[2] === '/'))) {
        name = name.replace(winSepRegEx, '/');
        resolved = resolvePath(parentPath.substr(0, parentPath.lastIndexOf('/') + 1) + percentDecode(name));
      } // URL
      else if (name.indexOf(':') !== -1) {
          if (isWindows && hasWinDrivePrefix(name)) {
            resolved = percentDecode(name).replace(winSepRegEx, '/');
          } else {
            const url = tryParseUrl(name);
            if (url.protocol === 'file:') resolved = percentDecode(isWindows ? url.pathname.substr(1) : url.pathname);else throwURLName(name);
          }
        }

    if (!resolved) return;

    if (cjsResolve) {
      const {
        pkgPath,
        pkgConfig
      } = await getPackageConfig.call(this, resolved, jspmProjectPath, cache);
      if (resolved[resolved.length - 1] === '/') resolved = resolved.substr(0, resolved.length - 1);
      const realpath = !jspmProjectPath || !resolved.startsWith(jspmProjectPath) || resolved[jspmProjectPath.length] !== '/';
      return nodePackageResolve.call(this, resolved, parentPath, false, realpath, env, pkgPath, pkgConfig, isMain, cache);
    }

    return finalizeResolve.call(this, resolved, jspmProjectPath, cjsResolve, isMain, cache);
  }

  function relativeResolveSync(name, parentPath, jspmProjectPath, cjsResolve, isMain, env, cache) {
    let resolved;

    if (name[0] === '/') {
      name = name.replace(winSepRegEx, '/');

      if (name[1] === '/') {
        if (name[2] === '/') throwInvalidModuleName(`${name} is not a valid module name.`);else resolved = resolvePath(percentDecode(name.substr(1 + isWindows)));
      } else {
        let path = isWindows ? name.substr(1) : name;
        if (isWindows && !hasWinDrivePrefix(path)) path = name;
        resolved = resolvePath(percentDecode(path));
      }
    } // Relative path
    else if (name[0] === '.' && (name.length === 1 || name[1] === '/' && (name = name.substr(2), true) || name[1] === '.' && (name.length === 2 || name[2] === '/'))) {
        name = name.replace(winSepRegEx, '/');
        resolved = resolvePath(parentPath.substr(0, parentPath.lastIndexOf('/') + 1) + percentDecode(name));
      } // URL
      else if (name.indexOf(':') !== -1) {
          if (isWindows && hasWinDrivePrefix(name)) {
            resolved = percentDecode(name).replace(winSepRegEx, '/');
          } else {
            const url = tryParseUrl(name);
            if (url.protocol === 'file:') resolved = percentDecode(isWindows ? url.pathname.substr(1) : url.pathname);else throwURLName(name);
          }
        }

    if (!resolved) return;

    if (cjsResolve) {
      const {
        pkgPath,
        pkgConfig
      } = getPackageConfigSync.call(this, resolved, jspmProjectPath, cache);
      if (resolved[resolved.length - 1] === '/') resolved = resolved.substr(0, resolved.length - 1);
      const realpath = !jspmProjectPath || !resolved.startsWith(jspmProjectPath) || resolved[jspmProjectPath.length] !== '/';
      return nodePackageResolve.call(this, resolved, parentPath, false, realpath, env, pkgPath, pkgConfig, isMain, cache);
    }

    return finalizeResolveSync.call(this, resolved, jspmProjectPath, cjsResolve, isMain, cache);
  }

  async function jspmProjectResolve(name, parentPkg, parentPkgConfig, jspmProjectPath, cjsResolve, isMain, env, cache) {
    let resolved;
    const jspmConfig = await this.readJspmConfig(jspmProjectPath, cache);
    if (!jspmConfig) return;
    const resolvedPkgName = await this.packageResolve(name, parentPkg && parentPkg.name, parentPkgConfig, jspmConfig);
    if (!resolvedPkgName) return;
    const resolvedPkg = parsePackageName(resolvedPkgName);
    if (!resolvedPkg) throwInvalidConfig(`${resolvedPkgName} is an invalid resolution in the jspm config file for ${jspmProjectPath}.`);
    let subPath = resolvedPkg.path;
    const pkgPath = packageToPath(resolvedPkg.name, jspmProjectPath);
    const pkgConfig = await this.readPackageConfig(pkgPath, cache);
    resolved = pkgPath + subPath;

    if (pkgConfig !== undefined) {
      if (subPath.length === 0) {
        if (pkgConfig.main === undefined) throwInvalidModuleName(`Cannot directly resolve package path ${pkgPath} as it has no package.json "main".`);
        subPath = '/' + pkgConfig.main;
        resolved = pkgPath + subPath;
      }

      if (pkgConfig.map !== undefined) {
        const mapped = applyMap('.' + subPath, pkgConfig.map, env);

        if (mapped !== undefined) {
          if (mapped === '@empty' || mapped === '@empty.dew') return env.browser ? {
            resolved: browserBuiltins + mapped + '.js',
            format: 'esm'
          } : {
            resolved: mapped,
            format: 'builtin'
          };
          resolved = pkgPath + '/' + mapped;
        }
      }
    }

    return finalizeResolve.call(this, resolved, jspmProjectPath, cjsResolve, isMain, cache);
  }

  function jspmProjectResolveSync(name, parentPkg, parentPkgConfig, jspmProjectPath, cjsResolve, isMain, env, cache) {
    let resolved;
    const jspmConfig = this.readJspmConfigSync(jspmProjectPath, cache);
    if (!jspmConfig) return;
    const resolvedPkgName = this.packageResolveSync(name, parentPkg && parentPkg.name, parentPkgConfig, jspmConfig);
    if (!resolvedPkgName) return;
    const resolvedPkg = parsePackageName(resolvedPkgName);
    if (!resolvedPkg) throwInvalidConfig(`${resolvedPkgName} is an invalid resolution in the jspm config file for ${jspmProjectPath}.`);
    let subPath = resolvedPkg.path;
    const pkgPath = packageToPath(resolvedPkg.name, jspmProjectPath);
    const pkgConfig = this.readPackageConfigSync(pkgPath, cache);
    resolved = pkgPath + subPath;

    if (pkgConfig !== undefined) {
      if (subPath.length === 0) {
        if (pkgConfig.main === undefined) throwInvalidModuleName(`Cannot directly resolve package path ${pkgPath} as it has no package.json "main".`);
        subPath = '/' + pkgConfig.main;
        resolved = pkgPath + subPath;
      }

      if (pkgConfig.map !== undefined) {
        const mapped = applyMap('.' + subPath, pkgConfig.map, env);

        if (mapped !== undefined) {
          if (mapped === '@empty' || mapped === '@empty.dew') return env.browser ? {
            resolved: browserBuiltins + mapped + '.js',
            format: 'esm'
          } : {
            resolved: mapped,
            format: 'builtin'
          };
          resolved = pkgPath + '/' + mapped;
        }
      }
    }

    return finalizeResolveSync.call(this, resolved, jspmProjectPath, cjsResolve, isMain, cache);
  }

  async function getPackageConfig(resolved, jspmProjectPath, cache) {
    if (!jspmProjectPath || !resolved.startsWith(jspmProjectPath) || resolved.length !== jspmProjectPath.length && resolved[jspmProjectPath.length] !== '/') return;
    const pkg = parsePackagePath(resolved, jspmProjectPath);
    const pkgPath = pkg ? packageToPath(pkg.name, jspmProjectPath) : jspmProjectPath;
    const pkgConfig = pkgPath ? await this.readPackageConfig(pkgPath, cache) : undefined;
    return {
      pkg,
      pkgPath,
      pkgConfig
    };
  }

  function getPackageConfigSync(resolved, jspmProjectPath, cache) {
    if (!jspmProjectPath || !resolved.startsWith(jspmProjectPath) || resolved.length !== jspmProjectPath.length && resolved[jspmProjectPath.length] !== '/') return;
    const pkg = parsePackagePath(resolved, jspmProjectPath);
    const pkgPath = pkg ? packageToPath(pkg.name, jspmProjectPath) : jspmProjectPath;
    const pkgConfig = pkgPath ? this.readPackageConfigSync(pkgPath, cache) : undefined;
    return {
      pkg,
      pkgPath,
      pkgConfig
    };
  }

  async function getPackageBoundary(resolved, cache) {
    const rootSeparatorIndex = resolved.indexOf('/');
    let separatorIndex;

    while ((separatorIndex = resolved.lastIndexOf('/')) > rootSeparatorIndex) {
      resolved = resolved.substr(0, separatorIndex);
      if (await this.isFile(resolved + '/package.json', cache)) return resolved;
    }
  }

  function getPackageBoundarySync(resolved, cache) {
    const rootSeparatorIndex = resolved.indexOf('/');
    let separatorIndex;

    while ((separatorIndex = resolved.lastIndexOf('/')) > rootSeparatorIndex) {
      resolved = resolved.substr(0, separatorIndex);
      if (this.isFileSync(resolved + '/package.json', cache)) return resolved;
    }
  }

  const builtins = {
    '@empty': true,
    '@empty.dew': true,
    assert: true,
    buffer: true,
    child_process: true,
    cluster: true,
    console: true,
    constants: true,
    crypto: true,
    dgram: true,
    dns: true,
    domain: true,
    events: true,
    fs: true,
    http: true,
    http2: true,
    https: true,
    module: true,
    net: true,
    os: true,
    path: true,
    process: true,
    punycode: true,
    querystring: true,
    readline: true,
    repl: true,
    stream: true,
    string_decoder: true,
    sys: true,
    timers: true,
    tls: true,
    tty: true,
    url: true,
    util: true,
    vm: true,
    worker_threads: true,
    zlib: true
  };
  const nodeCoreBrowserUnimplemented = {
    child_process: true,
    cluster: true,
    dgram: true,
    dns: true,
    fs: true,
    http2: true,
    module: true,
    net: true,
    readline: true,
    repl: true,
    tls: true,
    worker_threads: true
  };

  function builtinResolve(name, browserBuiltins) {
    if (builtins[name]) {
      if (browserBuiltins) {
        if (browserBuiltins[browserBuiltins.length - 1] !== '/') browserBuiltins += '/';
        if (nodeCoreBrowserUnimplemented[name]) return {
          resolved: browserBuiltins + '@empty.js',
          format: 'esm'
        };
        return {
          resolved: browserBuiltins + name + '.js',
          format: 'esm'
        };
      }

      return {
        resolved: name,
        format: 'builtin'
      };
    }
  }

  function nodeModulesResolve(name, parentPath, cjsResolve, env, cache) {
    let curParentPath = parentPath;
    let separatorIndex;
    let pkgName, pkgSubpath;

    if (name[0] === '@') {
      pkgName = name.split('/').slice(0, 2).join('/');
      pkgSubpath = name.substr(pkgName.length);
    } else {
      const slashIndex = name.indexOf('/');
      pkgName = slashIndex === -1 ? name : name.substr(0, slashIndex);
      pkgSubpath = name.substr(pkgName.length);
    }

    const rootSeparatorIndex = curParentPath.indexOf('/');

    while ((separatorIndex = curParentPath.lastIndexOf('/')) > rootSeparatorIndex) {
      curParentPath = curParentPath.substr(0, separatorIndex);
      const packagePath = curParentPath + '/node_modules/' + pkgName;

      if (this.isDirSync(packagePath, cache)) {
        const pcfg = this.readPackageConfigSync(packagePath, cache) || {};
        return nodePackageResolve.call(this, packagePath + pkgSubpath, parentPath, cjsResolve, true, env, packagePath, pcfg, cache);
      }
    }

    throwModuleNotFound(name, parentPath);
  }

  function nodePackageResolve(resolvedPath, parentPath, cjsResolve, realpath, env, packagePath, pcfg, isMain, cache) {
    if (resolvedPath === packagePath) {
      if (pcfg.main === undefined) resolvedPath = legacyDirResolve.call(this, packagePath, parentPath, cjsResolve, cache);else try {
        resolvedPath = legacyFileResolve.call(this, resolvedPath = packagePath + '/' + pcfg.main, parentPath, cjsResolve, cache);
      } catch (e) {
        if (e.code !== 'MODULE_NOT_FOUND') throw e;
      }
    } else {
      try {
        resolvedPath = legacyFileResolve.call(this, resolvedPath, parentPath, cjsResolve, cache);
      } catch (e) {
        if (e.code !== 'MODULE_NOT_FOUND') throw e;
      }
    }

    if (pcfg.map !== undefined && resolvedPath.startsWith(packagePath) && (resolvedPath.length === packagePath.length || resolvedPath[packagePath.length] === '/')) {
      const relPath = '.' + resolvedPath.substr(packagePath.length);
      const mapped = applyMap(relPath, pcfg.map, env);

      if (mapped !== undefined) {
        if (mapped === '@empty' || mapped === '@empty.dew') return env.browser ? {
          resolved: browserBuiltins + mapped + '.js',
          format: 'esm'
        } : {
          resolved: mapped,
          format: 'builtin'
        };
        resolvedPath = packagePath + '/' + mapped;
      }
    }

    return nodeFinalizeResolve.call(this, resolvedPath, parentPath, cjsResolve, realpath, isMain, cache);
  }

  async function finalizeResolve(resolved, jspmProjectPath, cjsResolve, isMain, cache) {
    if (resolved.endsWith('.mjs')) return {
      resolved,
      format: 'esm'
    };
    if (resolved.endsWith('.node')) return {
      resolved,
      format: 'addon'
    };
    if (cjsResolve && resolved.endsWith('.json')) return {
      resolved,
      format: 'json'
    };
    if (!isMain && !resolved.endsWith('.js')) return {
      resolved,
      format: 'unknown'
    };
    if (cjsResolve) return {
      resolved,
      format: 'cjs'
    };
    const boundary = await getPackageBoundary.call(this, resolved, cache);
    let cjs = !jspmProjectPath;

    if (boundary) {
      const pcfg = await this.readPackageConfig(boundary, cache);

      if (pcfg && pcfg.mode) {
        if (pcfg.mode === 'cjs') cjs = true;
        if (pcfg.mode === 'esm') cjs = false;
      }
    }

    return {
      resolved,
      format: cjs ? 'cjs' : 'esm'
    };
  }

  function finalizeResolveSync(resolved, jspmProjectPath, cjsResolve, isMain, cache) {
    if (resolved.endsWith('.mjs')) return {
      resolved,
      format: 'esm'
    };
    if (resolved.endsWith('.node')) return {
      resolved,
      format: 'addon'
    };
    if (cjsResolve && resolved.endsWith('.json')) return {
      resolved,
      format: 'json'
    };
    if (!isMain && !resolved.endsWith('.js')) return {
      resolved,
      format: 'unknown'
    };
    if (cjsResolve) return {
      resolved,
      format: 'cjs'
    };
    const boundary = getPackageBoundarySync.call(this, resolved, cache);
    let cjs = !jspmProjectPath;

    if (boundary) {
      const pcfg = this.readPackageConfigSync(boundary, cache);

      if (pcfg && pcfg.mode) {
        if (pcfg.mode === 'cjs') cjs = true;
        if (pcfg.mode === 'esm') cjs = false;
      }
    }

    return {
      resolved,
      format: cjs ? 'cjs' : 'esm'
    };
  }

  function legacyFileResolve(path, parentPath, cjsResolve, cache) {
    if (path[path.length - 1] === '/') return path;
    if (this.isFileSync(path, cache)) return path;
    if (!cjsResolve && this.isFileSync(path + '.mjs', cache)) return path + '.mjs';
    if (this.isFileSync(path + '.js', cache)) return path + '.js';
    if (this.isFileSync(path + '.json', cache)) return path + '.json';
    if (this.isFileSync(path + '.node', cache)) return path + '.node';
    return legacyDirResolve.call(this, path, parentPath, cjsResolve, cache);
  }

  function legacyDirResolve(path, parentPath, cjsResolve, cache) {
    if (this.isDirSync(path, cache)) {
      if (!cjsResolve && this.isFileSync(path + '/index.mjs', cache)) return path + '/index.mjs';
      if (this.isFileSync(path + '/index.js', cache)) return path + '/index.js';
      if (this.isFileSync(path + '/index.json', cache)) return path + '/index.json';
      if (this.isFileSync(path + '/index.node', cache)) return path + '/index.node';
    }

    throwModuleNotFound(path, parentPath);
  }

  function nodeFinalizeResolve(resolved, parentPath, cjsResolve, realpath, isMain, cache) {
    resolved = legacyFileResolve.call(this, resolved, parentPath, cjsResolve, cache);
    if (realpath) resolved = this.realpathSync(resolved);

    if (resolved.endsWith('.mjs')) {
      if (cjsResolve) throwInvalidModuleName(`Cannot load ".mjs" module ${resolved} from CommonJS module ${parentPath}.`);
      return {
        resolved,
        format: 'esm'
      };
    }

    if (resolved.endsWith('.js')) return {
      resolved,
      format: 'cjs'
    };
    if (resolved.endsWith('.json')) return {
      resolved,
      format: 'json'
    };
    if (resolved.endsWith('.node')) return {
      resolved,
      format: 'addon'
    };
    if (isMain) return {
      resolved,
      format: cjsResolve ? 'cjs' : 'esm'
    };
    return {
      resolved,
      format: 'unknown'
    };
  }

  const resolveUtils = {
    async getJspmProjectPath(modulePath, cache) {
      let separatorIndex = modulePath.lastIndexOf('/');
      const rootSeparatorIndex = modulePath.indexOf('/');

      do {
        const dir = modulePath.substr(0, separatorIndex);
        if (dir.endsWith('/node_modules')) break;
        separatorIndex = modulePath.lastIndexOf('/', separatorIndex - 1); // detect jspm_packages/pkg@x dependency path

        if (dir.lastIndexOf('@') > separatorIndex) {
          const jspmPackagesIndex = dir.lastIndexOf('/jspm_packages/');
          const nodeModulesIndex = dir.lastIndexOf('/node_modules/');

          if (jspmPackagesIndex !== -1 && nodeModulesIndex < jspmPackagesIndex) {
            const jspmProjectPath = dir.substr(0, jspmPackagesIndex);
            if (parsePackagePath(dir, jspmProjectPath)) return jspmProjectPath;
          }
        } // otherwise detect jspm project as jspm.json existing


        if (await this.isFile(dir + '/jspm.json', cache)) return dir;
      } while (separatorIndex > rootSeparatorIndex);
    },

    getJspmProjectPathSync(modulePath, cache) {
      let separatorIndex = modulePath.lastIndexOf('/');
      const rootSeparatorIndex = modulePath.indexOf('/');

      do {
        const dir = modulePath.substr(0, separatorIndex);
        if (dir.endsWith('/node_modules')) break;
        separatorIndex = modulePath.lastIndexOf('/', separatorIndex - 1); // detect jspm_packages/pkg@x dependency path

        if (dir.lastIndexOf('@') > separatorIndex) {
          const jspmPackagesIndex = dir.lastIndexOf('/jspm_packages/');
          const nodeModulesIndex = dir.lastIndexOf('/node_modules/');

          if (jspmPackagesIndex !== -1 && nodeModulesIndex < jspmPackagesIndex) {
            const jspmProjectPath = dir.substr(0, jspmPackagesIndex);
            if (parsePackagePath(dir, jspmProjectPath)) return jspmProjectPath;
          }
        } // otherwise detect jspm project as jspm.json existing


        if (this.isFileSync(dir + '/jspm.json', cache)) return dir;
      } while (separatorIndex > rootSeparatorIndex);
    },

    async readJspmConfig(jspmProjectPath, cache) {
      if (cache) {
        const cached = cache.jspmConfigCache[jspmProjectPath];
        if (cached) return cached;
      }

      let source;

      try {
        source = await this.readFile(jspmProjectPath + '/jspm.json');
      } catch (e) {
        if (e.code === 'ENOENT') return undefined;
        throw e;
      }

      let parsed;

      try {
        parsed = JSON.parse(source);
      } catch (e) {
        e.stack = `Unable to parse JSON file ${jspmProjectPath}/jspm.json\n${e.stack}`;
        e.code = 'INVALID_CONFIG';
        throw e;
      }

      if (!parsed.resolve) parsed.resolve = {};
      if (!parsed.dependencies) parsed.dependencies = {};
      if (cache) cache.jspmConfigCache[jspmProjectPath] = parsed;
      return parsed;
    },

    readJspmConfigSync(jspmProjectPath, cache) {
      if (cache) {
        const cached = cache.jspmConfigCache[jspmProjectPath];
        if (cached) return cached;
      }

      let source;

      try {
        source = this.readFileSync(jspmProjectPath + '/jspm.json');
      } catch (e) {
        if (e.code === 'ENOENT') return undefined;
        throw e;
      }

      let parsed;

      try {
        parsed = JSON.parse(source);
      } catch (e) {
        e.stack = `Unable to parse JSON file ${jspmProjectPath}/jspm.json\n${e.stack}`;
        e.code = 'INVALID_CONFIG';
        throw e;
      }

      if (!parsed.resolve) parsed.resolve = {};
      if (!parsed.dependencies) parsed.dependencies = {};
      if (cache) cache.jspmConfigCache[jspmProjectPath] = parsed;
      return parsed;
    },

    packageResolve(name, parentPackageName, parentPackageConfig, config) {
      if (!parentPackageName) return applyMap(name, config.resolve);
      const packageConfig = config.dependencies[parentPackageName];

      if (packageConfig && packageConfig.resolve) {
        const resolved = applyMap(name, packageConfig.resolve);
        if (resolved) return resolved;
      }

      if (isPeer(name, parentPackageConfig)) return applyMap(name, config.resolve);
    },

    packageResolveSync(name, parentPackageName, parentPackageConfig, config) {
      if (!parentPackageName) return applyMap(name, config.resolve);
      const packageConfig = config.dependencies[parentPackageName];

      if (packageConfig && packageConfig.resolve) {
        const resolved = applyMap(name, packageConfig.resolve);
        if (resolved) return resolved;
      }

      if (isPeer(name, parentPackageConfig)) return applyMap(name, config.resolve);
    },

    async readPackageConfig(packagePath, cache) {
      if (cache) {
        const cached = cache.pjsonConfigCache[packagePath];

        if (cached !== undefined) {
          if (cached === null) return undefined;
          return cached;
        }
      }

      let source;

      try {
        source = await this.readFile(packagePath + '/package.json');
      } catch (e) {
        if (e.code === 'ENOENT' || e.code === 'EISDIR') {
          if (cache) {
            cache.pjsonConfigCache[packagePath] = null;
            cache.isFileCache[packagePath + '/package.json'] = false;
          }

          return undefined;
        }

        throw e;
      }

      if (cache) cache.isFileCache[packagePath + '/package.json'] = true;
      let pjson;

      try {
        pjson = JSON.parse(source);
      } catch (e) {
        e.stack = `Unable to parse JSON file ${packagePath}/package.json\n${e.stack}`;
        e.code = 'INVALID_CONFIG';
        throw e;
      }

      const processed = processPjsonConfig(pjson);
      if (cache) cache.pjsonConfigCache[packagePath] = processed;
      return processed;
    },

    readPackageConfigSync(packagePath, cache) {
      if (cache) {
        const cached = cache.pjsonConfigCache[packagePath];

        if (cached !== undefined) {
          if (cached === null) return undefined;
          return cached;
        }
      }

      let source;

      try {
        source = this.readFileSync(packagePath + '/package.json');
      } catch (e) {
        if (e.code === 'ENOENT' || e.code === 'EISDIR') {
          if (cache) {
            cache.pjsonConfigCache[packagePath] = null;
            cache.isFileCache[packagePath + '/package.json'] = false;
          }

          return undefined;
        }

        throw e;
      }

      if (cache) cache.isFileCache[packagePath + '/package.json'] = true;
      let pjson;

      try {
        pjson = JSON.parse(source);
      } catch (e) {
        e.stack = `Unable to parse JSON file ${packagePath}/package.json\n${e.stack}`;
        e.code = 'INVALID_CONFIG';
        throw e;
      }

      const processed = processPjsonConfig(pjson);
      if (cache) cache.pjsonConfigCache[packagePath] = processed;
      return processed;
    },

    isDirSync(path, cache) {
      const cached = cache && cache.isDirCache[path];
      if (cached !== undefined) return cache.isDirCache[path];

      try {
        var stats = fs.statSync(path);
      } catch (e) {
        if (e.code === 'ENOENT' || e.code === 'ENOTDIR') {
          if (cache) cache.isDirCache[path] = false;
          return false;
        }

        throw e;
      }

      if (cache) cache.isDirCache[path] = stats.isDirectory();
      return stats.isDirectory();
    },

    async isFile(path, cache) {
      if (cache) {
        const cached = cache.isFileCache[path];
        if (cached !== undefined) return cached;
      }

      try {
        var stats = await new Promise((resolve, reject) => fs.stat(path, (err, stats) => err ? reject(err) : resolve(stats)));
      } catch (e) {
        if (e.code === 'ENOENT' || e.code === 'ENOTDIR') {
          if (cache) cache.isFileCache[path] = false;
          return false;
        }

        throw e;
      }

      if (cache) cache.isFileCache[path] = stats.isFile();
      return stats.isFile();
    },

    isFileSync(path, cache) {
      if (cache) {
        const cached = cache.isFileCache[path];
        if (cached !== undefined) return cached;
      }

      try {
        var stats = fs.statSync(path);
      } catch (e) {
        if (e.code === 'ENOENT' || e.code === 'ENOTDIR') {
          if (cache) cache.isFileCache[path] = false;
          return false;
        }

        throw e;
      }

      if (cache) cache.isFileCache[path] = stats.isFile();
      return stats.isFile();
    },

    realpathSync(path) {
      const trailingSlash = path[path.length - 1] === '/';
      const realpath = fs.realpathSync(path);
      if (realpath.indexOf('\\') !== -1) return realpath.replace(winSepRegEx, '/') + (trailingSlash ? '/' : '');
      return realpath + (trailingSlash ? '/' : '');
    },

    readFile(path) {
      return new Promise((resolve, reject) => {
        fs.readFile(path, (err, source) => err ? reject(err) : resolve(source.toString()));
      });
    },

    readFileSync(path) {
      return fs.readFileSync(path);
    }

  };
  resolve.applyMap = applyMap;
  resolve.sync = resolveSync;
  resolve.utils = resolveUtils;
  resolve.builtins = builtins;
  const winPathRegEx = /^[a-z]:\//i;

  resolve.cjsResolve = function (request, parent) {
    if (request.match(winPathRegEx)) request = '/' + request;
    if (request[request.length - 1] === '/') request = request.substr(0, request.length - 1);
    const {
      resolved
    } = resolveSync(request, parent && parent.filename, {
      cjsResolve: true,
      cache: parent && parent.cache
    });
    return resolved;
  };

  exports$1 = resolve;

  function conditionMap(mapped, env) {
    main: while (typeof mapped !== 'string') {
      for (let c in mapped) {
        if (env[c] === true) {
          mapped = mapped[c];
          continue main;
        }
      }

      return undefined;
    }

    return mapped;
  }

  function isPeer(name, pcfg) {
    if (!pcfg.peerDependencies) return false;

    for (const peerDep of Object.keys(pcfg.peerDependencies)) {
      if (name.startsWith(peerDep) && name.length === peerDep.length || name[peerDep.length] === '/') return true;
    }

    return false;
  }

  function applyMap(name, parentMap, env) {
    let separatorIndex = name.length - 1;
    let exactSeparator = name[separatorIndex] === '/';
    let match = name.substr(0, separatorIndex + 1);

    do {
      if (match === '.') break;
      let mapped = parentMap[match];

      if (mapped !== undefined) {
        mapped = conditionMap(mapped, env);

        if (mapped !== undefined) {
          if (match[0] === '.' && mapped[0] === '.' && match[1] === '/' && mapped[1] === '/') mapped = mapped.substr(2);

          if (mapped[mapped.length - 1] === '/') {
            if (match[match.length - 1] !== '/') throwInvalidConfig(`Invalid map config "${match}" -> "${mapped}" - target cannot have a trailing separator.`);
          } else {
            if (match[match.length - 1] === '/') mapped += '/';
          }

          return mapped + name.substr(match.length);
        }
      }

      if (exactSeparator) {
        match = name.substr(0, separatorIndex);
      } else {
        separatorIndex = name.lastIndexOf('/', separatorIndex - 1);
        match = name.substr(0, separatorIndex + 1);
      }

      exactSeparator = !exactSeparator;
    } while (separatorIndex !== -1);
  }

  resolve.processPjsonConfig = processPjsonConfig;

  function processPjsonConfig(pjson) {
    const pcfg = {
      main: typeof pjson.main === 'string' ? stripLeadingDotsAndTrailingSlash(pjson.main) : undefined,
      map: typeof pjson.map === 'object' ? pjson.map : undefined,
      mode: pjson.mode === 'esm' || pjson.mode === 'cjs' ? pjson.mode : undefined
    };
    let mainMap;

    if (pjson.bin) {
      let bin;

      if (typeof pjson.bin !== 'object') {
        bin = pjson.bin;
      } else {
        if (typeof pjson.name === 'string' && pjson.bin[pjson.name] !== undefined) bin = pjson.bin[pjson.name];else bin = Object.keys(pjson.bin)[0];
      }

      if (bin) (mainMap = mainMap || {})['bin'] = stripLeadingDotsAndTrailingSlash(bin);
    }

    if (typeof pjson['react-native'] === 'string') (mainMap = mainMap || {})['react-native'] = stripLeadingDotsAndTrailingSlash(pjson['react-native']);
    if (typeof pjson.electron === 'string') (mainMap = mainMap || {}).electron = stripLeadingDotsAndTrailingSlash(pjson.electron);
    if (typeof pjson.browser === 'string') (mainMap = mainMap || {}).browser = stripLeadingDotsAndTrailingSlash(pjson.browser);
    if (typeof pjson.peerDependencies === 'object') pcfg.peerDependencies = pjson.peerDependencies;

    if (mainMap) {
      if (!pcfg.map) pcfg.map = {};
      if (pcfg.main === undefined) pcfg.main = 'index.js';
      if (!pcfg.map['./' + pcfg.main]) pcfg.map['./' + pcfg.main] = mainMap;
    }

    if (typeof pjson.browser === 'object') {
      if (!pcfg.map) pcfg.map = {};

      for (let p in pjson.browser) {
        let mapping = pjson.browser[p];
        if (mapping === false) mapping = '@empty';
        if (p[0] === '.' && p[1] === '/' && !p.endsWith('.js')) p += '.js';

        if (mainMap && pcfg.map[p] === mainMap) {
          mainMap.browser = mapping;
          continue;
        }

        if (pcfg.map[p] !== undefined) continue;
        pcfg.map[p] = {
          browser: mapping
        };
      }
    }

    return pcfg;
  }

  function stripLeadingDotsAndTrailingSlash(path) {
    if (path.startsWith('./')) path = path.substr(2);
    if (path[path.length - 1] === '/') path = path.substr(0, path.length - 1);
    return path;
  }

  return exports$1;
}

const exports$2 = dew();
const applyMap = exports$2.applyMap, sync = exports$2.sync, utils = exports$2.utils, builtins = exports$2.builtins, cjsResolve = exports$2.cjsResolve;

export default exports$2;
export { applyMap, sync, utils, builtins, cjsResolve };
