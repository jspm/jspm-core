import http from './http.js';
import { h } from './chunk-4b524f9b.js';
import './chunk-5ec93e6c.js';
import './chunk-e4efb04d.js';
import './chunk-ff6a5e51.js';
import './chunk-13140bc3.js';
import './chunk-0f70056b.js';
import './chunk-5752f882.js';
import './chunk-0029504c.js';
import './chunk-5ab39309.js';
import './chunk-1514fda9.js';
import './chunk-c9ae16fc.js';

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
