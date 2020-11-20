import { a as notImplemented, v as validateIntegerRange } from './chunk-d9b5bf01.js';

// Copyright Joyent, Inc. and other Node contributors.
var fsEOL;

(function (fsEOL) {
  fsEOL["LF"] = "\n";
  fsEOL["CRLF"] = "\r\n";
})(fsEOL || (fsEOL = {}));

const SEE_GITHUB_ISSUE = "See https://github.com/denoland/deno/issues/3802";

arch[Symbol.toPrimitive] = () => arch();

endianness[Symbol.toPrimitive] = () => endianness();

freemem[Symbol.toPrimitive] = () => freemem();

homedir[Symbol.toPrimitive] = () => homedir();

hostname[Symbol.toPrimitive] = () => hostname();

platform[Symbol.toPrimitive] = () => platform();

release[Symbol.toPrimitive] = () => release();

totalmem[Symbol.toPrimitive] = () => totalmem();

type[Symbol.toPrimitive] = () => type();

uptime[Symbol.toPrimitive] = () => uptime();
/** Returns the operating system CPU architecture for which the Deno binary was compiled */


function arch() {
  return Deno.build.arch;
}
/** Not yet implemented */

function cpus() {
  notImplemented(SEE_GITHUB_ISSUE);
}
/**
 * Returns a string identifying the endianness of the CPU for which the Deno
 * binary was compiled. Possible values are 'BE' for big endian and 'LE' for
 * little endian.
 **/

function endianness() {
  // Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView#Endianness
  const buffer = new ArrayBuffer(2);
  new DataView(buffer).setInt16(0, 256, true
  /* littleEndian */
  ); // Int16Array uses the platform's endianness.

  return new Int16Array(buffer)[0] === 256 ? "LE" : "BE";
}
/** Not yet implemented */

function freemem() {
  notImplemented(SEE_GITHUB_ISSUE);
}
/** Not yet implemented */

function getPriority(pid = 0) {
  validateIntegerRange(pid, "pid");
  notImplemented(SEE_GITHUB_ISSUE);
}
/** Returns the string path of the current user's home directory. */

function homedir() {
  notImplemented(SEE_GITHUB_ISSUE);
}
/** Returns the host name of the operating system as a string. */

function hostname() {
  notImplemented(SEE_GITHUB_ISSUE);
}
/** Returns an array containing the 1, 5, and 15 minute load averages */

function loadavg() {
  if (Deno.build.os === "windows") {
    return [0, 0, 0];
  }

  return Deno.loadavg();
}
/** Not yet implemented */

function networkInterfaces() {
  notImplemented(SEE_GITHUB_ISSUE);
}
/** Returns the a string identifying the operating system platform. The value is set at compile time. Possible values are 'darwin', 'linux', and 'win32'. */

function platform() {
  return Deno.build.os === "windows" ? "win32" : Deno.build.os;
}
/** Returns the operating system as a string */

function release() {
  return Deno.osRelease();
}
/** Not yet implemented */

function setPriority(pid, priority) {
  /* The node API has the 'pid' as the first parameter and as optional.
       This makes for a problematic implementation in Typescript. */
  if (priority === undefined) {
    priority = pid;
    pid = 0;
  }

  validateIntegerRange(pid, "pid");
  validateIntegerRange(priority, "priority", -20, 19);
  notImplemented(SEE_GITHUB_ISSUE);
}
/** Returns the operating system's default directory for temporary files as a string. */

function tmpdir() {
  notImplemented(SEE_GITHUB_ISSUE);
}
/** Not yet implemented */

function totalmem() {
  notImplemented(SEE_GITHUB_ISSUE);
}
/** Not yet implemented */

function type() {
  notImplemented(SEE_GITHUB_ISSUE);
}
/** Not yet implemented */

function uptime() {
  notImplemented(SEE_GITHUB_ISSUE);
}
/** Not yet implemented */

function userInfo(options = {
  encoding: "utf-8"
}) {
  notImplemented(SEE_GITHUB_ISSUE);
}
const constants = {
  // UV_UDP_REUSEADDR: 4,  //see https://nodejs.org/docs/latest-v12.x/api/os.html#os_libuv_constants
  dlopen: {// see https://nodejs.org/docs/latest-v12.x/api/os.html#os_dlopen_constants
  },
  errno: {// see https://nodejs.org/docs/latest-v12.x/api/os.html#os_error_constants
  },
  signals: Deno.Signal,
  priority: {// see https://nodejs.org/docs/latest-v12.x/api/os.html#os_priority_constants
  }
};
const EOL = Deno.build.os == "windows" ? fsEOL.CRLF : fsEOL.LF;

var m = /*#__PURE__*/Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: 'Module',
  arch: arch,
  cpus: cpus,
  endianness: endianness,
  freemem: freemem,
  getPriority: getPriority,
  homedir: homedir,
  hostname: hostname,
  loadavg: loadavg,
  networkInterfaces: networkInterfaces,
  platform: platform,
  release: release,
  setPriority: setPriority,
  tmpdir: tmpdir,
  totalmem: totalmem,
  type: type,
  uptime: uptime,
  userInfo: userInfo,
  constants: constants,
  EOL: EOL
});

// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.

export default m;
export { EOL, arch, constants, cpus, endianness, freemem, getPriority, homedir, hostname, loadavg, networkInterfaces, platform, release, setPriority, tmpdir, totalmem, type, uptime, userInfo };
