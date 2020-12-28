import './chunk-b16434e4.js';
import { a as notImplemented, i as intoCallbackAPIWithIntercept } from './chunk-d9b5bf01.js';
import { f as fileURLToPath } from './chunk-4212b94d.js';
import { i as isFileOptions, g as getOpenOptions, p as promises, a as readFile, b as readFileSync, c as writeFile, d as writeFileSync } from './chunk-38c1c248.js';
export { p as promises, a as readFile, b as readFileSync, c as writeFile, d as writeFileSync } from './chunk-38c1c248.js';

// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.
/** Revist once https://github.com/denoland/deno/issues/4017 lands */
//TODO - 'path' can also be a Buffer.  Neither of these polyfills
//is available yet.  See https://github.com/denoland/deno/issues/3403

function access(_path, _modeOrCallback, _callback) {
  notImplemented("Not yet available");
} //TODO - 'path' can also be a Buffer.  Neither of these polyfills
//is available yet.  See https://github.com/denoland/deno/issues/3403
// eslint-disable-next-line @typescript-eslint/no-unused-vars

function accessSync(path, mode) {
  notImplemented("Not yet available");
}

// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.
/**
 * TODO: Also accept 'data' parameter as a Node polyfill Buffer type once these
 * are implemented. See https://github.com/denoland/deno/issues/3403
 */

function appendFile(pathOrRid, data, optionsOrCallback, callback) {
  pathOrRid = pathOrRid instanceof URL ? fileURLToPath(pathOrRid) : pathOrRid;
  const callbackFn = optionsOrCallback instanceof Function ? optionsOrCallback : callback;
  const options = optionsOrCallback instanceof Function ? undefined : optionsOrCallback;

  if (!callbackFn) {
    throw new Error("No callback function supplied");
  }

  validateEncoding(options);
  let rid = -1;
  const buffer = data instanceof Uint8Array ? data : new TextEncoder().encode(data);
  new Promise((resolve, reject) => {
    if (typeof pathOrRid === "number") {
      rid = pathOrRid;
      Deno.write(rid, buffer).then(resolve).catch(reject);
    } else {
      const mode = isFileOptions(options) ? options.mode : undefined;
      const flag = isFileOptions(options) ? options.flag : undefined;

      if (mode) {
        //TODO rework once https://github.com/denoland/deno/issues/4017 completes
        notImplemented("Deno does not yet support setting mode on create");
      }

      Deno.open(pathOrRid, getOpenOptions(flag)).then(({
        rid: openedFileRid
      }) => {
        rid = openedFileRid;
        return Deno.write(openedFileRid, buffer);
      }).then(resolve).catch(reject);
    }
  }).then(() => {
    closeRidIfNecessary(typeof pathOrRid === "string", rid);
    callbackFn();
  }).catch(err => {
    closeRidIfNecessary(typeof pathOrRid === "string", rid);
    callbackFn(err);
  });
}

function closeRidIfNecessary(isPathString, rid) {
  if (isPathString && rid != -1) {
    //Only close if a path was supplied and a rid allocated
    Deno.close(rid);
  }
}
/**
 * TODO: Also accept 'data' parameter as a Node polyfill Buffer type once these
 * are implemented. See https://github.com/denoland/deno/issues/3403
 */


function appendFileSync(pathOrRid, data, options) {
  let rid = -1;
  validateEncoding(options);
  pathOrRid = pathOrRid instanceof URL ? fileURLToPath(pathOrRid) : pathOrRid;

  try {
    if (typeof pathOrRid === "number") {
      rid = pathOrRid;
    } else {
      const mode = isFileOptions(options) ? options.mode : undefined;
      const flag = isFileOptions(options) ? options.flag : undefined;

      if (mode) {
        // TODO rework once https://github.com/denoland/deno/issues/4017 completes
        notImplemented("Deno does not yet support setting mode on create");
      }

      const file = Deno.openSync(pathOrRid, getOpenOptions(flag));
      rid = file.rid;
    }

    const buffer = data instanceof Uint8Array ? data : new TextEncoder().encode(data);
    Deno.writeSync(rid, buffer);
  } finally {
    closeRidIfNecessary(typeof pathOrRid === "string", rid);
  }
}

function validateEncoding(encodingOption) {
  if (!encodingOption) return;

  if (typeof encodingOption === "string") {
    if (encodingOption !== "utf8") {
      throw new Error("Only 'utf8' encoding is currently supported");
    }
  } else if (encodingOption.encoding && encodingOption.encoding !== "utf8") {
    throw new Error("Only 'utf8' encoding is currently supported");
  }
}

// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.
const allowedModes = /^[0-7]{3}/;
/**
 * TODO: Also accept 'path' parameter as a Node polyfill Buffer type once these
 * are implemented. See https://github.com/denoland/deno/issues/3403
 */

function chmod(path, mode, callback) {
  path = path instanceof URL ? fileURLToPath(path) : path;
  Deno.chmod(path, getResolvedMode(mode)).then(() => callback()).catch(callback);
}
/**
 * TODO: Also accept 'path' parameter as a Node polyfill Buffer type once these
 * are implemented. See https://github.com/denoland/deno/issues/3403
 */

function chmodSync(path, mode) {
  path = path instanceof URL ? fileURLToPath(path) : path;
  Deno.chmodSync(path, getResolvedMode(mode));
}

function getResolvedMode(mode) {
  if (typeof mode === "number") {
    return mode;
  }

  if (typeof mode === "string" && !allowedModes.test(mode)) {
    throw new Error("Unrecognized mode: " + mode);
  }

  return parseInt(mode, 8);
}

// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.
/**
 * TODO: Also accept 'path' parameter as a Node polyfill Buffer type once these
 * are implemented. See https://github.com/denoland/deno/issues/3403
 */

function chown(path, uid, gid, callback) {
  path = path instanceof URL ? fileURLToPath(path) : path;
  Deno.chown(path, uid, gid).then(() => callback()).catch(callback);
}
/**
 * TODO: Also accept 'path' parameter as a Node polyfill Buffer type once these
 * are implemented. See https://github.com/denoland/deno/issues/3403
 */

function chownSync(path, uid, gid) {
  path = path instanceof URL ? fileURLToPath(path) : path;
  Deno.chownSync(path, uid, gid);
}

// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.
function close(fd, callback) {
  queueMicrotask(() => {
    try {
      Deno.close(fd);
      callback(null);
    } catch (err) {
      callback(err);
    }
  });
}
function closeSync(fd) {
  Deno.close(fd);
}

// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.
//File access constants
const F_OK = 0;
const R_OK = 4;
const W_OK = 2;
const X_OK = 1; //File mode constants

const S_IRUSR = 0o400; //read by owner

const S_IWUSR = 0o200; //write by owner

const S_IXUSR = 0o100; //execute/search by owner

const S_IRGRP = 0o40; //read by group

const S_IWGRP = 0o20; //write by group

const S_IXGRP = 0o10; //execute/search by group

const S_IROTH = 0o4; //read by others

const S_IWOTH = 0o2; //write by others

const S_IXOTH = 0o1; //execute/search by others

var _fs_constants = /*#__PURE__*/Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: 'Module',
  F_OK: F_OK,
  R_OK: R_OK,
  W_OK: W_OK,
  X_OK: X_OK,
  S_IRUSR: S_IRUSR,
  S_IWUSR: S_IWUSR,
  S_IXUSR: S_IXUSR,
  S_IRGRP: S_IRGRP,
  S_IWGRP: S_IWGRP,
  S_IXGRP: S_IXGRP,
  S_IROTH: S_IROTH,
  S_IWOTH: S_IWOTH,
  S_IXOTH: S_IXOTH
});

// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.

function maybeEncode(data, encoding) {
  if (encoding === "buffer") {
    return new TextEncoder().encode(data);
  }

  return data;
}

function getEncoding(optOrCallback) {
  if (!optOrCallback || typeof optOrCallback === "function") {
    return null;
  } else {
    if (optOrCallback.encoding) {
      if (optOrCallback.encoding === "utf8" || optOrCallback.encoding === "utf-8") {
        return "utf8";
      } else if (optOrCallback.encoding === "buffer") {
        return "buffer";
      } else {
        notImplemented();
      }
    }

    return null;
  }
}

function readlink(path, optOrCallback, callback) {
  path = path instanceof URL ? fileURLToPath(path) : path;
  let cb;

  if (typeof optOrCallback === "function") {
    cb = optOrCallback;
  } else {
    cb = callback;
  }

  const encoding = getEncoding(optOrCallback);
  intoCallbackAPIWithIntercept(Deno.readLink, data => maybeEncode(data, encoding), cb, path);
}
function readlinkSync(path, opt) {
  path = path instanceof URL ? fileURLToPath(path) : path;
  return maybeEncode(Deno.readLinkSync(path), getEncoding(opt));
}

// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.

/**
 * TODO: Also accept 'path' parameter as a Node polyfill Buffer type once these
 * are implemented. See https://github.com/denoland/deno/issues/3403
 * Deprecated in node api
 */
function exists(path, callback) {
  path = path instanceof URL ? fileURLToPath(path) : path;
  Deno.lstat(path).then(() => {
    callback(true);
  }).catch(() => callback(false));
}
/**
 * TODO: Also accept 'path' parameter as a Node polyfill Buffer or URL type once these
 * are implemented. See https://github.com/denoland/deno/issues/3403
 */

function existsSync(path) {
  path = path instanceof URL ? fileURLToPath(path) : path;

  try {
    Deno.lstatSync(path);
    return true;
  } catch (err) {
    if (err instanceof Deno.errors.NotFound) {
      return false;
    }

    throw err;
  }
}

// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.
/**
 * TODO: Also accept 'path' parameter as a Node polyfill Buffer type once these
 * are implemented. See https://github.com/denoland/deno/issues/3403
 */

function mkdir(path, options, callback) {
  path = path instanceof URL ? fileURLToPath(path) : path;
  let mode = 0o777;
  let recursive = false;

  if (typeof options == "function") {
    callback = options;
  } else if (typeof options === "number") {
    mode = options;
  } else if (typeof options === "boolean") {
    recursive = options;
  } else if (options) {
    if (options.recursive !== undefined) recursive = options.recursive;
    if (options.mode !== undefined) mode = options.mode;
  }

  if (typeof recursive !== "boolean") {
    throw new Deno.errors.InvalidData("invalid recursive option , must be a boolean");
  }

  Deno.mkdir(path, {
    recursive,
    mode
  }).then(() => {
    if (typeof callback === "function") {
      callback();
    }
  }).catch(err => {
    if (typeof callback === "function") {
      callback(err);
    }
  });
}
function mkdirSync(path, options) {
  path = path instanceof URL ? fileURLToPath(path) : path;
  let mode = 0o777;
  let recursive = false;

  if (typeof options === "number") {
    mode = options;
  } else if (typeof options === "boolean") {
    recursive = options;
  } else if (options) {
    if (options.recursive !== undefined) recursive = options.recursive;
    if (options.mode !== undefined) mode = options.mode;
  }

  if (typeof recursive !== "boolean") {
    throw new Deno.errors.InvalidData("invalid recursive option , must be a boolean");
  }

  try {
    Deno.mkdirSync(path, {
      recursive,
      mode
    });
  }
  catch (e) {
    switch (e.name) {
      case 'AlreadyExists':
        e.code = 'EEXIST';
        throw e;
      case 'NotFound':
        e.code = 'ENOENT';
        throw e;
      default:
        throw e;
    }
  }
}

// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.
function copyFile(source, destination, callback) {
  source = source instanceof URL ? fileURLToPath(source) : source;
  Deno.copyFile(source, destination).then(() => callback()).catch(callback);
}
function copyFileSync(source, destination) {
  source = source instanceof URL ? fileURLToPath(source) : source;
  Deno.copyFileSync(source, destination);
}

var e={};var t="object"===typeof Reflect?Reflect:null;var n=t&&"function"===typeof t.apply?t.apply:function ReflectApply(e,t,n){return Function.prototype.apply.call(e,t,n)};var r;r=t&&"function"===typeof t.ownKeys?t.ownKeys:Object.getOwnPropertySymbols?function ReflectOwnKeys(e){return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e))}:function ReflectOwnKeys(e){return Object.getOwnPropertyNames(e)};function ProcessEmitWarning(e){console&&console.warn&&console.warn(e);}var i=Number.isNaN||function NumberIsNaN(e){return e!==e};function EventEmitter(){EventEmitter.init.call(this);}e=EventEmitter;e.once=once;EventEmitter.EventEmitter=EventEmitter;EventEmitter.prototype._events=void 0;EventEmitter.prototype._eventsCount=0;EventEmitter.prototype._maxListeners=void 0;var s=10;function checkListener(e){if("function"!==typeof e)throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof e)}Object.defineProperty(EventEmitter,"defaultMaxListeners",{enumerable:true,get:function(){return s},set:function(e){if("number"!==typeof e||e<0||i(e))throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received '+e+".");s=e;}});EventEmitter.init=function(){if(void 0===this._events||this._events===Object.getPrototypeOf(this)._events){this._events=Object.create(null);this._eventsCount=0;}this._maxListeners=this._maxListeners||void 0;};EventEmitter.prototype.setMaxListeners=function setMaxListeners(e){if("number"!==typeof e||e<0||i(e))throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received '+e+".");this._maxListeners=e;return this};function _getMaxListeners(e){return void 0===e._maxListeners?EventEmitter.defaultMaxListeners:e._maxListeners}EventEmitter.prototype.getMaxListeners=function getMaxListeners(){return _getMaxListeners(this)};EventEmitter.prototype.emit=function emit(e){var t=[];for(var r=1;r<arguments.length;r++)t.push(arguments[r]);var i="error"===e;var s=this._events;if(void 0!==s)i=i&&void 0===s.error;else if(!i)return false;if(i){var o;t.length>0&&(o=t[0]);if(o instanceof Error)throw o;var v=new Error("Unhandled error."+(o?" ("+o.message+")":""));v.context=o;throw v}var a=s[e];if(void 0===a)return false;if("function"===typeof a)n(a,this,t);else {var u=a.length;var f=arrayClone(a,u);for(var r=0;r<u;++r)n(f[r],this,t);}return true};function _addListener(e,t,n,r){var i;var s;var o;checkListener(n);s=e._events;if(void 0===s){s=e._events=Object.create(null);e._eventsCount=0;}else {if(void 0!==s.newListener){e.emit("newListener",t,n.listener?n.listener:n);s=e._events;}o=s[t];}if(void 0===o){o=s[t]=n;++e._eventsCount;}else {"function"===typeof o?o=s[t]=r?[n,o]:[o,n]:r?o.unshift(n):o.push(n);i=_getMaxListeners(e);if(i>0&&o.length>i&&!o.warned){o.warned=true;var v=new Error("Possible EventEmitter memory leak detected. "+o.length+" "+String(t)+" listeners "+"added. Use emitter.setMaxListeners() to "+"increase limit");v.name="MaxListenersExceededWarning";v.emitter=e;v.type=t;v.count=o.length;ProcessEmitWarning(v);}}return e}EventEmitter.prototype.addListener=function addListener(e,t){return _addListener(this,e,t,false)};EventEmitter.prototype.on=EventEmitter.prototype.addListener;EventEmitter.prototype.prependListener=function prependListener(e,t){return _addListener(this,e,t,true)};function onceWrapper(){if(!this.fired){this.target.removeListener(this.type,this.wrapFn);this.fired=true;return 0===arguments.length?this.listener.call(this.target):this.listener.apply(this.target,arguments)}}function _onceWrap(e,t,n){var r={fired:false,wrapFn:void 0,target:e,type:t,listener:n};var i=onceWrapper.bind(r);i.listener=n;r.wrapFn=i;return i}EventEmitter.prototype.once=function once(e,t){checkListener(t);this.on(e,_onceWrap(this,e,t));return this};EventEmitter.prototype.prependOnceListener=function prependOnceListener(e,t){checkListener(t);this.prependListener(e,_onceWrap(this,e,t));return this};EventEmitter.prototype.removeListener=function removeListener(e,t){var n,r,i,s,o;checkListener(t);r=this._events;if(void 0===r)return this;n=r[e];if(void 0===n)return this;if(n===t||n.listener===t)if(0===--this._eventsCount)this._events=Object.create(null);else {delete r[e];r.removeListener&&this.emit("removeListener",e,n.listener||t);}else if("function"!==typeof n){i=-1;for(s=n.length-1;s>=0;s--)if(n[s]===t||n[s].listener===t){o=n[s].listener;i=s;break}if(i<0)return this;0===i?n.shift():spliceOne(n,i);1===n.length&&(r[e]=n[0]);void 0!==r.removeListener&&this.emit("removeListener",e,o||t);}return this};EventEmitter.prototype.off=EventEmitter.prototype.removeListener;EventEmitter.prototype.removeAllListeners=function removeAllListeners(e){var t,n,r;n=this._events;if(void 0===n)return this;if(void 0===n.removeListener){if(0===arguments.length){this._events=Object.create(null);this._eventsCount=0;}else void 0!==n[e]&&(0===--this._eventsCount?this._events=Object.create(null):delete n[e]);return this}if(0===arguments.length){var i=Object.keys(n);var s;for(r=0;r<i.length;++r){s=i[r];"removeListener"!==s&&this.removeAllListeners(s);}this.removeAllListeners("removeListener");this._events=Object.create(null);this._eventsCount=0;return this}t=n[e];if("function"===typeof t)this.removeListener(e,t);else if(void 0!==t)for(r=t.length-1;r>=0;r--)this.removeListener(e,t[r]);return this};function _listeners(e,t,n){var r=e._events;if(void 0===r)return [];var i=r[t];return void 0===i?[]:"function"===typeof i?n?[i.listener||i]:[i]:n?unwrapListeners(i):arrayClone(i,i.length)}EventEmitter.prototype.listeners=function listeners(e){return _listeners(this,e,true)};EventEmitter.prototype.rawListeners=function rawListeners(e){return _listeners(this,e,false)};EventEmitter.listenerCount=function(e,t){return "function"===typeof e.listenerCount?e.listenerCount(t):listenerCount.call(e,t)};EventEmitter.prototype.listenerCount=listenerCount;function listenerCount(e){var t=this._events;if(void 0!==t){var n=t[e];if("function"===typeof n)return 1;if(void 0!==n)return n.length}return 0}EventEmitter.prototype.eventNames=function eventNames(){return this._eventsCount>0?r(this._events):[]};function arrayClone(e,t){var n=new Array(t);for(var r=0;r<t;++r)n[r]=e[r];return n}function spliceOne(e,t){for(;t+1<e.length;t++)e[t]=e[t+1];e.pop();}function unwrapListeners(e){var t=new Array(e.length);for(var n=0;n<t.length;++n)t[n]=e[n].listener||e[n];return t}function once(e,t){return new Promise((function(n,r){function eventListener(){void 0!==i&&e.removeListener("error",i);n([].slice.call(arguments));}var i;if("error"!==t){i=function errorListener(n){e.removeListener(t,eventListener);r(n);};e.once("error",i);}e.once(t,eventListener);}))}var o=e;const v=e.once;

var EventEmitter$1 = o.EventEmitter;
var defaultMaxListeners = o.defaultMaxListeners;
var init = o.init;
var listenerCount$1 = o.listenerCount;

function asyncIterableIteratorToCallback(iterator, callback) {
  function next() {
    iterator.next().then(obj => {
      if (obj.done) {
        callback(obj.value, true);
        return;
      }

      callback(obj.value);
      next();
    });
  }

  next();
}
function asyncIterableToCallback(iter, callback) {
  const iterator = iter[Symbol.asyncIterator]();

  function next() {
    iterator.next().then(obj => {
      if (obj.done) {
        callback(obj.value, true);
        return;
      }

      callback(obj.value);
      next();
    });
  }

  next();
}
function watch(filename, optionsOrListener, optionsOrListener2) {
  const listener = typeof optionsOrListener === "function" ? optionsOrListener : typeof optionsOrListener2 === "function" ? optionsOrListener2 : undefined;
  const options = typeof optionsOrListener === "object" ? optionsOrListener : typeof optionsOrListener2 === "object" ? optionsOrListener2 : undefined;
  filename = filename instanceof URL ? fileURLToPath(filename) : filename;
  const iterator = Deno.watchFs(filename, {
    recursive: options?.recursive || false
  });
  if (!listener) throw new Error("No callback function supplied");
  const fsWatcher = new FSWatcher(() => {
    if (iterator.return) iterator.return();
  });
  fsWatcher.on("change", listener);
  asyncIterableIteratorToCallback(iterator, (val, done) => {
    if (done) return;
    fsWatcher.emit("change", val.kind, val.paths[0]);
  });
  return fsWatcher;
}

class FSWatcher extends EventEmitter$1 {
  constructor(closer) {
    super();
    this.close = closer;
  }

  ref() {
    notImplemented("FSWatcher.ref() is not implemented");
  }

  unref() {
    notImplemented("FSWatcher.unref() is not implemented");
  }

}

// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.
class Dirent {
  constructor(entry) {
    this.entry = entry;
  }

  isBlockDevice() {
    notImplemented("Deno does not yet support identification of block devices");
    return false;
  }

  isCharacterDevice() {
    notImplemented("Deno does not yet support identification of character devices");
    return false;
  }

  isDirectory() {
    return this.entry.isDirectory;
  }

  isFIFO() {
    notImplemented("Deno does not yet support identification of FIFO named pipes");
    return false;
  }

  isFile() {
    return this.entry.isFile;
  }

  isSocket() {
    notImplemented("Deno does not yet support identification of sockets");
    return false;
  }

  isSymbolicLink() {
    return this.entry.isSymlink;
  }

  get name() {
    return this.entry.name;
  }

}

function toDirent(val) {
  return new Dirent(val);
}

function readdir(path, optionsOrCallback, maybeCallback) {
  const callback = typeof optionsOrCallback === "function" ? optionsOrCallback : maybeCallback;
  const options = typeof optionsOrCallback === "object" ? optionsOrCallback : null;
  const result = [];
  path = path instanceof URL ? fileURLToPath(path) : path;
  if (!callback) throw new Error("No callback function supplied");

  if (options?.encoding) {
    try {
      new TextDecoder(options.encoding);
    } catch (error) {
      throw new Error(`TypeError [ERR_INVALID_OPT_VALUE_ENCODING]: The value "${options.encoding}" is invalid for option "encoding"`);
    }
  }

  try {
    asyncIterableToCallback(Deno.readDir(path), (val, done) => {
      if (typeof path !== "string") return;

      if (done) {
        callback(undefined, result);
        return;
      }

      if (options?.withFileTypes) {
        result.push(toDirent(val));
      } else result.push(decode(val.name));
    });
  } catch (error) {
    callback(error, result);
  }
}

function decode(str, encoding) {
  if (!encoding) return str;else {
    const decoder = new TextDecoder(encoding);
    const encoder = new TextEncoder();
    return decoder.decode(encoder.encode(str));
  }
}

function readdirSync(path, options) {
  const result = [];
  path = path instanceof URL ? fileURLToPath(path) : path;

  if (options?.encoding) {
    try {
      new TextDecoder(options.encoding);
    } catch (error) {
      throw new Error(`TypeError [ERR_INVALID_OPT_VALUE_ENCODING]: The value "${options.encoding}" is invalid for option "encoding"`);
    }
  }

  for (const file of Deno.readDirSync(path)) {
    if (options?.withFileTypes) {
      result.push(toDirent(file));
    } else result.push(decode(file.name));
  }

  return result;
}

function realpath(path, options, callback) {
  if (typeof options === "function") {
    callback = options;
  }

  if (!callback) {
    throw new Error("No callback function supplied");
  }

  Deno.realPath(path).then(path => callback(null, path)).catch(err => callback(err));
}
function realpathSync(path) {
  return Deno.realPathSync(path);
}

function rename(oldPath, newPath, callback) {
  oldPath = oldPath instanceof URL ? fileURLToPath(oldPath) : oldPath;
  newPath = newPath instanceof URL ? fileURLToPath(newPath) : newPath;
  if (!callback) throw new Error("No callback function supplied");
  Deno.rename(oldPath, newPath).then(_ => callback()).catch(callback);
}
function renameSync(oldPath, newPath) {
  oldPath = oldPath instanceof URL ? fileURLToPath(oldPath) : oldPath;
  newPath = newPath instanceof URL ? fileURLToPath(newPath) : newPath;
  Deno.renameSync(oldPath, newPath);
}

function rmdir(path, optionsOrCallback, maybeCallback) {
  const callback = typeof optionsOrCallback === "function" ? optionsOrCallback : maybeCallback;
  const options = typeof optionsOrCallback === "object" ? optionsOrCallback : undefined;
  if (!callback) throw new Error("No callback function supplied");
  Deno.remove(path, {
    recursive: options?.recursive
  }).then(_ => callback()).catch(callback);
}
function rmdirSync(path, options) {
  Deno.removeSync(path, {
    recursive: options?.recursive
  });
}

function unlink(path, callback) {
  if (!callback) throw new Error("No callback function supplied");
  Deno.remove(path).then(_ => callback()).catch(callback);
}
function unlinkSync(path) {
  Deno.removeSync(path);
}

function existsSync$1(filePath) {
  try {
    Deno.lstatSync(filePath);
    return true;
  } catch (err) {
    if (err instanceof Deno.errors.NotFound) {
      return false;
    }

    throw err;
  }
}

function convertFlagAndModeToOptions(flag, mode) {
  if (!flag && !mode) return undefined;
  if (!flag && mode) return {
    mode
  };
  return { ...getOpenOptions(flag),
    mode
  };
}

function open(path, flagsOrCallback, callbackOrMode, maybeCallback) {
  const flags = typeof flagsOrCallback === "string" ? flagsOrCallback : undefined;
  const callback = typeof flagsOrCallback === "function" ? flagsOrCallback : typeof callbackOrMode === "function" ? callbackOrMode : maybeCallback;
  const mode = typeof callbackOrMode === "number" ? callbackOrMode : undefined;
  path = path instanceof URL ? fileURLToPath(path) : path;
  if (!callback) throw new Error("No callback function supplied");

  if (["ax", "ax+", "wx", "wx+"].includes(flags || "") && existsSync$1(path)) {
    const err = new Error(`EEXIST: file already exists, open '${path}'`);
    callback(err, 0);
  } else {
    if (flags === "as" || flags === "as+") {
      try {
        const res = openSync(path, flags, mode);
        callback(undefined, res);
      } catch (error) {
        callback(error, error);
      }

      return;
    }

    Deno.open(path, convertFlagAndModeToOptions(flags, mode)).then(file => callback(undefined, file.rid)).catch(err => callback(err, err));
  }
}
function openSync(path, flagsOrMode, maybeMode) {
  const flags = typeof flagsOrMode === "string" ? flagsOrMode : undefined;
  const mode = typeof flagsOrMode === "number" ? flagsOrMode : maybeMode;
  path = path instanceof URL ? fileURLToPath(path) : path;

  if (["ax", "ax+", "wx", "wx+"].includes(flags || "") && existsSync$1(path)) {
    throw new Error(`EEXIST: file already exists, open '${path}'`);
  }

  return Deno.openSync(path, convertFlagAndModeToOptions(flags, mode)).rid;
}

function convertFileInfoToStats(origin) {
  return {
    dev: origin.dev,
    ino: origin.ino,
    mode: origin.mode,
    nlink: origin.nlink,
    uid: origin.uid,
    gid: origin.gid,
    rdev: origin.rdev,
    size: origin.size,
    blksize: origin.blksize,
    blocks: origin.blocks,
    mtime: origin.mtime,
    atime: origin.atime,
    birthtime: origin.birthtime,
    mtimeMs: origin.mtime?.getTime() || null,
    atimeMs: origin.atime?.getTime() || null,
    birthtimeMs: origin.birthtime?.getTime() || null,
    isFile: () => origin.isFile,
    isDirectory: () => origin.isDirectory,
    isSymbolicLink: () => origin.isSymlink,
    // not sure about those
    isBlockDevice: () => false,
    isFIFO: () => false,
    isCharacterDevice: () => false,
    isSocket: () => false,
    ctime: origin.mtime,
    ctimeMs: origin.mtime?.getTime() || null
  };
}

function toBigInt(number) {
  if (number === null || number === undefined) return null;
  return BigInt(number);
}

function convertFileInfoToBigIntStats(origin) {
  return {
    dev: toBigInt(origin.dev),
    ino: toBigInt(origin.ino),
    mode: toBigInt(origin.mode),
    nlink: toBigInt(origin.nlink),
    uid: toBigInt(origin.uid),
    gid: toBigInt(origin.gid),
    rdev: toBigInt(origin.rdev),
    size: toBigInt(origin.size) || 0n,
    blksize: toBigInt(origin.blksize),
    blocks: toBigInt(origin.blocks),
    mtime: origin.mtime,
    atime: origin.atime,
    birthtime: origin.birthtime,
    mtimeMs: origin.mtime ? BigInt(origin.mtime.getTime()) : null,
    atimeMs: origin.atime ? BigInt(origin.atime.getTime()) : null,
    birthtimeMs: origin.birthtime ? BigInt(origin.birthtime.getTime()) : null,
    mtimeNs: origin.mtime ? BigInt(origin.mtime.getTime()) * 1000000n : null,
    atimeNs: origin.atime ? BigInt(origin.atime.getTime()) * 1000000n : null,
    birthtimeNs: origin.birthtime ? BigInt(origin.birthtime.getTime()) * 1000000n : null,
    isFile: () => origin.isFile,
    isDirectory: () => origin.isDirectory,
    isSymbolicLink: () => origin.isSymlink,
    // not sure about those
    isBlockDevice: () => false,
    isFIFO: () => false,
    isCharacterDevice: () => false,
    isSocket: () => false,
    ctime: origin.mtime,
    ctimeMs: origin.mtime ? BigInt(origin.mtime.getTime()) : null,
    ctimeNs: origin.mtime ? BigInt(origin.mtime.getTime()) * 1000000n : null
  };
} // shortcut for Convert File Info to Stats or BigIntStats

function CFISBIS(fileInfo, bigInt) {
  if (bigInt) return convertFileInfoToBigIntStats(fileInfo);
  return convertFileInfoToStats(fileInfo);
}
function stat(path, optionsOrCallback, maybeCallback) {
  const callback = typeof optionsOrCallback === "function" ? optionsOrCallback : maybeCallback;
  const options = typeof optionsOrCallback === "object" ? optionsOrCallback : {
    bigint: false
  };
  if (!callback) throw new Error("No callback function supplied");
  Deno.stat(path).then(stat => callback(undefined, CFISBIS(stat, options.bigint))).catch(err => callback(err, err));
}
function statSync(path, options = {
  bigint: false
}) {
  const origin = Deno.statSync(path);
  return CFISBIS(origin, options.bigint);
}

function lstat(path, optionsOrCallback, maybeCallback) {
  const callback = typeof optionsOrCallback === "function" ? optionsOrCallback : maybeCallback;
  const options = typeof optionsOrCallback === "object" ? optionsOrCallback : {
    bigint: false
  };
  if (!callback) throw new Error("No callback function supplied");
  Deno.lstat(path).then(stat => callback(undefined, CFISBIS(stat, options.bigint))).catch(err => callback(err, err));
}
function lstatSync(path, options) {
  const origin = Deno.lstatSync(path);
  return CFISBIS(origin, options?.bigint || false);
}

// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.

var m = /*#__PURE__*/Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: 'Module',
  access: access,
  accessSync: accessSync,
  appendFile: appendFile,
  appendFileSync: appendFileSync,
  chmod: chmod,
  chmodSync: chmodSync,
  chown: chown,
  chownSync: chownSync,
  close: close,
  closeSync: closeSync,
  constants: _fs_constants,
  copyFile: copyFile,
  copyFileSync: copyFileSync,
  exists: exists,
  existsSync: existsSync,
  lstat: lstat,
  lstatSync: lstatSync,
  mkdir: mkdir,
  mkdirSync: mkdirSync,
  open: open,
  openSync: openSync,
  promises: promises,
  readdir: readdir,
  readdirSync: readdirSync,
  readFile: readFile,
  readFileSync: readFileSync,
  readlink: readlink,
  readlinkSync: readlinkSync,
  realpath: realpath,
  realpathSync: realpathSync,
  rename: rename,
  renameSync: renameSync,
  rmdir: rmdir,
  rmdirSync: rmdirSync,
  stat: stat,
  statSync: statSync,
  unlink: unlink,
  unlinkSync: unlinkSync,
  watch: watch,
  writeFile: writeFile,
  writeFileSync: writeFileSync
});

// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.

export default m;
export { access, accessSync, appendFile, appendFileSync, chmod, chmodSync, chown, chownSync, close, closeSync, _fs_constants as constants, copyFile, copyFileSync, exists, existsSync, lstat, lstatSync, mkdir, mkdirSync, open, openSync, readdir, readdirSync, readlink, readlinkSync, realpath, realpathSync, rename, renameSync, rmdir, rmdirSync, stat, statSync, unlink, unlinkSync, watch };
