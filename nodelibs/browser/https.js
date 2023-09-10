import exports$2 from './http.js';
import h from './url.js';
import './chunk-c1749ca1.js';
import './chunk-001ff647.js';
import './chunk-739d4e67.js';
import './chunk-566596b9.js';
import './chunk-32df7659.js';
import './chunk-6ad9b8b8.js';
import './chunk-605e2a90.js';
import './chunk-27f095bd.js';
import './chunk-536e269c.js';
import './chunk-f8bc79bd.js';
import './chunk-01029fce.js';

var exports$1 = {},
    _dewExec = false;

var _global = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : global;

function dew() {
  if (_dewExec) return exports$1;
  _dewExec = true;
  var http = exports$2;
  var url = h;
  var https = exports$1;

  for (var key in http) {
    if (http.hasOwnProperty(key)) https[key] = http[key];
  }

  https.request = function (params, cb) {
    params = validateParams(params);
    return http.request.call(this || _global, params, cb);
  };

  https.get = function (params, cb) {
    params = validateParams(params);
    return http.get.call(this || _global, params, cb);
  };

  function validateParams(params) {
    if (typeof params === "string") {
      params = url.parse(params);
    }

    if (!params.protocol) {
      params.protocol = "https:";
    }

    if (params.protocol !== "https:") {
      throw new Error("Protocol \"" + params.protocol + "\" not supported. Expected \"https:\"");
    }

    return params;
  }

  return exports$1;
}

const exports = dew();

var Agent = exports.Agent;
var ClientRequest = exports.ClientRequest;
var IncomingMessage = exports.IncomingMessage;
var METHODS = exports.METHODS;
var STATUS_CODES = exports.STATUS_CODES;
var get = exports.get;
var globalAgent = exports.globalAgent;
var request = exports.request;

export { Agent, ClientRequest, IncomingMessage, METHODS, STATUS_CODES, exports as default, get, globalAgent, request };
