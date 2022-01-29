import http from './http.js';
import h from './url.js';
import './chunk-a75abdc7.js';
import './chunk-eb4a3827.js';
import './chunk-bf402f6f.js';
import './chunk-b196e9ea.js';
import './chunk-af36a440.js';
import './chunk-41a25566.js';
import './chunk-83f77422.js';
import './chunk-191e88d4.js';
import './chunk-32ebc98f.js';
import './chunk-3afc512b.js';
import './chunk-8330aff8.js';

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
