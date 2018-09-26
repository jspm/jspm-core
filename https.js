import _http from './http.js';
import _url from './url.js';
import './chunk-1a62783c.js';
import './chunk-fddb501f.js';
import './process.js';
import './events.js';
import './buffer.js';
import './string_decoder-a0532e16.js';
import './querystring.js';

var exports$1 = {},
    _dewExec = false;

var _global = typeof self !== "undefined" ? self : global;

function dew() {
  if (_dewExec) return exports$1;
  _dewExec = true;
  var http = _http;
  var url = _url;
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

const exports$2 = dew();
const Agent = exports$2.Agent, ClientRequest = exports$2.ClientRequest, IncomingMessage = exports$2.IncomingMessage, METHODS = exports$2.METHODS, STATUS_CODES = exports$2.STATUS_CODES, get = exports$2.get, globalAgent = exports$2.globalAgent, request = exports$2.request;

export default exports$2;
export { Agent, ClientRequest, IncomingMessage, METHODS, STATUS_CODES, get, globalAgent, request };
