import './chunk-82560236.js';
import './process.js';
import _assert from './assert.js';
import './chunk-cf607276.js';
import _util from './util.js';

var exports$1 = {},
    _dewExec = false;
function dew() {
  if (_dewExec) return exports$1;
  _dewExec = true;
  exports$1 = now;

  function now() {
    return new Date().getTime();
  }

  return exports$1;
}

var exports$2 = {},
    _dewExec$1 = false;

var _global = typeof self !== "undefined" ? self : global;

function dew$1() {
  if (_dewExec$1) return exports$2;
  _dewExec$1 = true;

  /*global window, global*/
  var util = _util;
  var assert = _assert;

  var now = dew();

  var slice = Array.prototype.slice;
  var console;
  var times = {};

  if (typeof _global !== "undefined" && _global.console) {
    console = _global.console;
  } else if (typeof window !== "undefined" && window.console) {
    console = window.console;
  } else {
    console = {};
  }

  var functions = [[log, "log"], [info, "info"], [warn, "warn"], [error, "error"], [time, "time"], [timeEnd, "timeEnd"], [trace, "trace"], [dir, "dir"], [consoleAssert, "assert"]];

  for (var i = 0; i < functions.length; i++) {
    var tuple = functions[i];
    var f = tuple[0];
    var name = tuple[1];

    if (!console[name]) {
      console[name] = f;
    }
  }

  exports$2 = console;

  function log() {}

  function info() {
    console.log.apply(console, arguments);
  }

  function warn() {
    console.log.apply(console, arguments);
  }

  function error() {
    console.warn.apply(console, arguments);
  }

  function time(label) {
    times[label] = now();
  }

  function timeEnd(label) {
    var time = times[label];

    if (!time) {
      throw new Error("No such label: " + label);
    }

    var duration = now() - time;
    console.log(label + ": " + duration + "ms");
  }

  function trace() {
    var err = new Error();
    err.name = "Trace";
    err.message = util.format.apply(null, arguments);
    console.error(err.stack);
  }

  function dir(object) {
    console.log(util.inspect(object) + "\n");
  }

  function consoleAssert(expression) {
    if (!expression) {
      var arr = slice.call(arguments, 1);
      assert.ok(false, util.format.apply(null, arr));
    }
  }

  return exports$2;
}

const exports$3 = dew$1();
const assert = exports$3.assert, clear = exports$3.clear, context = exports$3.context, count = exports$3.count, countReset = exports$3.countReset, debug = exports$3.debug, dir = exports$3.dir, dirxml = exports$3.dirxml, error = exports$3.error, group = exports$3.group, groupCollapsed = exports$3.groupCollapsed, groupEnd = exports$3.groupEnd, info = exports$3.info, log = exports$3.log, memory = exports$3.memory, profile = exports$3.profile, profileEnd = exports$3.profileEnd, table = exports$3.table, time = exports$3.time, timeEnd = exports$3.timeEnd, timeStamp = exports$3.timeStamp, trace = exports$3.trace, warn = exports$3.warn;

export default exports$3;
export { assert, clear, context, count, countReset, debug, dir, dirxml, error, group, groupCollapsed, groupEnd, info, log, memory, profile, profileEnd, table, time, timeEnd, timeStamp, trace, warn };
