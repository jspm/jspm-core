import './util.js';
import et from './assert.js';
import { X } from './chunk-13140bc3.js';
import './chunk-ff6a5e51.js';
import './chunk-0f70056b.js';

var exports = {},
    _dewExec = false;

var _global = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : global;

function dew() {
  if (_dewExec) return exports;
  _dewExec = true;

  /*global window, global*/
  var util = X;
  var assert = et;

  function now() {
    return new Date().getTime();
  }

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

  exports = console;

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

    delete times[label];
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

  return exports;
}

var console = dew();

var assert = console.assert;
var clear = console.clear;
var context = console.context;
var count = console.count;
var countReset = console.countReset;
var debug = console.debug;
var dir = console.dir;
var dirxml = console.dirxml;
var error = console.error;
var group = console.group;
var groupCollapsed = console.groupCollapsed;
var groupEnd = console.groupEnd;
var info = console.info;
var log = console.log;
var memory = console.memory;
var profile = console.profile;
var profileEnd = console.profileEnd;
var table = console.table;
var time = console.time;
var timeEnd = console.timeEnd;
var timeStamp = console.timeStamp;
var trace = console.trace;
var warn = console.warn;

export { assert, clear, context, count, countReset, debug, console as default, dir, dirxml, error, group, groupCollapsed, groupEnd, info, log, memory, profile, profileEnd, table, time, timeEnd, timeStamp, trace, warn };
