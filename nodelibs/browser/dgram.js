function unimplemented () {
  throw new Error('Node.js dgram module is not supported by jspm core' + (typeof Deno !== 'undefined' ? '. Deno support here is tracking in https://github.com/jspm/jspm-core/issues/4, +1\'s are appreciated!' : ' in the browser'));
}

export default {
  _createSocketHandle: unimplemented,
  createSocket: unimplemented,
  Socket: unimplemented
};

export {
  unimplemented as _createSocketHandle,
  unimplemented as createSocket,
  unimplemented as Socket
}
