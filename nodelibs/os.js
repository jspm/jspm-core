var exports$1 = {},
    _dewExec = false;
function dew() {
  if (_dewExec) return exports$1;
  _dewExec = true;

  exports$1.endianness = function () {
    return 'LE';
  };

  exports$1.hostname = function () {
    if (typeof location !== 'undefined') {
      return location.hostname;
    } else return '';
  };

  exports$1.loadavg = function () {
    return [];
  };

  exports$1.uptime = function () {
    return 0;
  };

  exports$1.freemem = function () {
    return Number.MAX_VALUE;
  };

  exports$1.totalmem = function () {
    return Number.MAX_VALUE;
  };

  exports$1.cpus = function () {
    return [];
  };

  exports$1.type = function () {
    return 'Browser';
  };

  exports$1.release = function () {
    if (typeof navigator !== 'undefined') {
      return navigator.appVersion;
    }

    return '';
  };

  exports$1.networkInterfaces = exports$1.getNetworkInterfaces = function () {
    return {};
  };

  exports$1.arch = function () {
    return 'javascript';
  };

  exports$1.platform = function () {
    return 'browser';
  };

  exports$1.tmpdir = exports$1.tmpDir = function () {
    return '/tmp';
  };

  exports$1.EOL = '\n';

  exports$1.homedir = function () {
    return '/';
  };

  return exports$1;
}

const exports$2 = dew();
const EOL = exports$2.EOL, arch = exports$2.arch, cpus = exports$2.cpus, endianness = exports$2.endianness, freemem = exports$2.freemem, getNetworkInterfaces = exports$2.getNetworkInterfaces, homedir = exports$2.homedir, hostname = exports$2.hostname, loadavg = exports$2.loadavg, networkInterfaces = exports$2.networkInterfaces, platform = exports$2.platform, release = exports$2.release, tmpDir = exports$2.tmpDir, tmpdir = exports$2.tmpdir, totalmem = exports$2.totalmem, type = exports$2.type, uptime = exports$2.uptime;

export default exports$2;
export { EOL, arch, cpus, endianness, freemem, getNetworkInterfaces, homedir, hostname, loadavg, networkInterfaces, platform, release, tmpDir, tmpdir, totalmem, type, uptime };
