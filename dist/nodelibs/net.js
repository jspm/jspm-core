function unimplemented () {
  throw new Error('Node.js net module is not supported by jspm core' + (typeof Deno !== 'undefined' ? '. Deno support here is tracking in https://github.com/jspm/jspm-core/issues/4, +1\'s are appreciated!' : ' in the browser'));
}

var net = {
  _createServerHandle: unimplemented,
  _normalizeArgs: unimplemented,
  _setSimultaneousAccepts: unimplemented,
  connect: unimplemented,
  createConnection: unimplemented,
  createServer: unimplemented,
  isIP: unimplemented,
  isIPv4: unimplemented,
  isIPv6: unimplemented,
  Server: unimplemented,
  Socket: unimplemented,
  Stream: unimplemented
};

export default net;
export { unimplemented as Server, unimplemented as Socket, unimplemented as Stream, unimplemented as _createServerHandle, unimplemented as _normalizeArgs, unimplemented as _setSimultaneousAccepts, unimplemented as connect, unimplemented as createConnection, unimplemented as createServer, unimplemented as isIP, unimplemented as isIPv4, unimplemented as isIPv6 };
