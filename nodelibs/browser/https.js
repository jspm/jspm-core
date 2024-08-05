import exports$2 from './http.js';
import h from './url.js';
import './chunk-CU2hd6BF.js';
import './chunk-tHuMsdT0.js';
import './chunk-BZgdGiNw.js';
import './chunk-D04hy_Cu.js';
import './chunk-DEckhzyo.js';
import './chunk-b0rmRow7.js';
import './chunk-C9hMJ5VR.js';
import './chunk-aBeyrThb.js';
import './chunk-CKeAujU-.js';
import './chunk-D5E0hY9V.js';
import './chunk-DppJZDIM.js';

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
