function unimplemented(name) {
  throw new Error('Node.js process ' + name + ' is not supported by JSPM core outside of Node.js');
}

var nextTick = cb => Promise.resolve().then(cb);
var title = 'browser';
var arch = 'x64';
var platform = 'browser';
var env = {
  PATH: '/usr/bin',
  LANG: navigator.language + '.UTF-8',
  PWD: '/',
  HOME: '/home',
  TMP: '/tmp',
};
var argv = ['/usr/bin/node'];
var execArgv = [];
var version = 'v16.8.0';
var versions = { node: '16.8.0' };

var emitWarning = function(message, type) {
  console.warn((type ? (type + ': ') : '') + message);
};

var binding = function(name) { unimplemented('binding'); };

var umask = function(mask) { return 0; };

var cwd = function() { return '/'; };
var chdir = function(dir) {};

var release = {
  name: 'node',
  sourceUrl: '',
  headersUrl: '',
  libUrl: '',
};

function noop() {}

var _rawDebug = noop;
var moduleLoadList = [];
function _linkedBinding(name) { unimplemented('_linkedBinding'); }
var domain = {};
var _exiting = false;
var config = {};
function dlopen(name) { unimplemented('dlopen'); }
function _getActiveRequests() { return []; }
function _getActiveHandles() { return []; }
var reallyExit = noop;
var _kill = noop;
var cpuUsage = function() { return {}; };
var resourceUsage = cpuUsage;
var memoryUsage = cpuUsage;
var kill = noop;
var exit = noop;
var openStdin = noop;
var allowedNodeEnvironmentFlags = {};
function assert(condition, message) {
  if (!condition) throw new Error(message || 'assertion error');
}
var features = {
  inspector: false,
  debug: false,
  uv: false,
  ipv6: false,
  tls_alpn: false,
  tls_sni: false,
  tls_ocsp: false,
  tls: false,
  cached_builtins: true,
};
var _fatalExceptions = noop;
var setUncaughtExceptionCaptureCallback = noop;
function hasUncaughtExceptionCaptureCallback() { return false; }var _tickCallback = noop;
var _debugProcess = noop;
var _debugEnd = noop;
var _startProfilerIdleNotifier = noop;
var _stopProfilerIdleNotifier = noop;
var stdout = undefined;
var stderr = undefined;
var stdin = undefined;
var abort = noop;
var pid = 2;
var ppid = 1;
var execPath = '/bin/usr/node';
var debugPort = 9229;
var argv0 = 'node';
var _preload_modules = [];
var setSourceMapsEnabled = noop;

var _performance = {
  now: typeof performance !== 'undefined' ? performance.now.bind(performance) : undefined,
  timing: typeof performance !== 'undefined' ? performance.timing : undefined,
};
if (_performance.now === undefined) {
  var nowOffset = Date.now();

  if (_performance.timing && _performance.timing.navigationStart) {
    nowOffset = _performance.timing.navigationStart;
  }
  _performance.now = () => Date.now() - nowOffset;
}

function uptime() {
  return _performance.now() / 1000;
}

var nanoPerSec = 1000000000;
function hrtime(previousTimestamp) {
  var baseNow = Math.floor((Date.now() - _performance.now()) * 1e-3);
  var clocktime = _performance.now() * 1e-3;
  var seconds = Math.floor(clocktime) + baseNow;
  var nanoseconds = Math.floor((clocktime % 1) * 1e9);
  if (previousTimestamp) {
    seconds = seconds - previousTimestamp[0];
    nanoseconds = nanoseconds - previousTimestamp[1];
    if (nanoseconds < 0) {
      seconds--;
      nanoseconds += nanoPerSec;
    }
  }
  return [seconds, nanoseconds];
}hrtime.bigint = function(time) {
  var diff = hrtime(time);
  if (typeof BigInt === 'undefined') {
    return diff[0] * nanoPerSec + diff[1];
  }
  return BigInt(diff[0] * nanoPerSec) + BigInt(diff[1]);
};

var process = {
  version,
  versions,
  arch,
  platform,
  release,
  _rawDebug,
  moduleLoadList,
  binding,
  _linkedBinding,
  _events,
  _eventsCount,
  _maxListeners,
  domain,
  _exiting,
  config,
  dlopen,
  uptime,
  _getActiveRequests,
  _getActiveHandles,
  reallyExit,
  _kill,
  cpuUsage,
  resourceUsage,
  memoryUsage,
  kill,
  exit,
  openStdin,
  allowedNodeEnvironmentFlags,
  assert,
  features,
  _fatalExceptions,
  setUncaughtExceptionCaptureCallback,
  hasUncaughtExceptionCaptureCallback,
  emitWarning,
  nextTick,
  _tickCallback,
  _debugProcess,
  _debugEnd,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  stdout,
  stdin,
  stderr,
  abort,
  umask,
  chdir,
  cwd,
  env,
  title,
  argv,
  execArgv,
  pid,
  ppid,
  execPath,
  debugPort,
  hrtime,
  argv0,
  _preload_modules,
  setSourceMapsEnabled,
};

var _maxListeners = 10;
var _events = {};
var _eventsCount = 0;
var on = function() { return process; };
var addListener = on;
var once = on;
var off = on;
var removeListener = on;
var removeAllListeners = on;
var emit = noop;
var prependListener = on;
var prependOnceListener = on;
var listeners = function(name) { return []; };

export { _debugEnd, _debugProcess, _events, _eventsCount, _exiting, _fatalExceptions, _getActiveHandles, _getActiveRequests, _kill, _linkedBinding, _maxListeners, _preload_modules, _rawDebug, _startProfilerIdleNotifier, _stopProfilerIdleNotifier, _tickCallback, abort, addListener, allowedNodeEnvironmentFlags, arch, argv, argv0, assert, binding, chdir, config, cpuUsage, cwd, debugPort, process as default, dlopen, domain, emit, emitWarning, env, execArgv, execPath, exit, features, hasUncaughtExceptionCaptureCallback, hrtime, kill, listeners, memoryUsage, moduleLoadList, nextTick, off, on, once, openStdin, pid, platform, ppid, prependListener, prependOnceListener, process, reallyExit, release, removeAllListeners, removeListener, resourceUsage, setSourceMapsEnabled, setUncaughtExceptionCaptureCallback, stderr, stdin, stdout, title, umask, uptime, version, versions };
