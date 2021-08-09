import http from './http.js';
import { h } from './chunk-deebbc2f.js';
import './chunk-53533520.js';
import './chunk-cc7644df.js';
import './chunk-1f427064.js';
import './chunk-d49beef2.js';
import './chunk-51fee26b.js';
import './chunk-d07c462d.js';
import './chunk-c8c409cb.js';
import './chunk-91498336.js';
import './chunk-d7b2e109.js';
import './chunk-0ffb79c6.js';

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
