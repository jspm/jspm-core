import http from './http.js';
import h from './url.js';
import './chunk-44e51b61.js';
import './chunk-4bd36a8f.js';
import './chunk-ce0fbc82.js';
import './chunk-b4205b57.js';
import './chunk-5decc758.js';
import './chunk-2eac56ff.js';
import './chunk-4ccc3a29.js';
import './chunk-c3d025d9.js';
import './chunk-924bb2e1.js';
import './chunk-b04e620d.js';
import './chunk-c8a91054.js';

var exports = {},
    _dewExec = false;

var _global = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : global;

function dew() {
  if (_dewExec) return exports;
  _dewExec = true;
  var http$1 = http;
  var url = h;
  var https = exports;

  for (var key in http$1) {
    if (http$1.hasOwnProperty(key)) https[key] = http$1[key];
  }

  https.request = function (params, cb) {
    params = validateParams(params);
    return http$1.request.call(this || _global, params, cb);
  };

  https.get = function (params, cb) {
    params = validateParams(params);
    return http$1.get.call(this || _global, params, cb);
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

  return exports;
}

var https = dew();

var Agent = https.Agent;
var ClientRequest = https.ClientRequest;
var IncomingMessage = https.IncomingMessage;
var METHODS = https.METHODS;
var STATUS_CODES = https.STATUS_CODES;
var get = https.get;
var globalAgent = https.globalAgent;
var request = https.request;

export { Agent, ClientRequest, IncomingMessage, METHODS, STATUS_CODES, https as default, get, globalAgent, request };
