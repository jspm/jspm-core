import { a as dew } from './chunk-53551bdf.js';
import './chunk-1a62783c.js';
import './chunk-e06c6f32.js';
import './chunk-8a9a6273.js';
import './chunk-00324d2c.js';
import './@empty.js';
import './chunk-0d8b1bfc.js';
import './chunk-9a292033.js';
import { a as dew$1 } from './chunk-30e7e4ea.js';
import './chunk-11cf3c93.js';

var exports$1 = {},
    _dewExec = false;

var _global = typeof self !== "undefined" ? self : global;

function dew$2() {
  if (_dewExec) return exports$1;
  _dewExec = true;

  var http = dew();

  var url = dew$1();

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
    if (typeof params === 'string') {
      params = url.parse(params);
    }

    if (!params.protocol) {
      params.protocol = 'https:';
    }

    if (params.protocol !== 'https:') {
      throw new Error('Protocol "' + params.protocol + '" not supported. Expected "https:"');
    }

    return params;
  }

  return exports$1;
}

const exports$2 = dew$2();
const Agent = exports$2.Agent, ClientRequest = exports$2.ClientRequest, IncomingMessage = exports$2.IncomingMessage, METHODS = exports$2.METHODS, STATUS_CODES = exports$2.STATUS_CODES, get = exports$2.get, globalAgent = exports$2.globalAgent, request = exports$2.request;

export default exports$2;
export { Agent, ClientRequest, IncomingMessage, METHODS, STATUS_CODES, get, globalAgent, request };
