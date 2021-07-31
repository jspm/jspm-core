function unimplemented () {
  throw new Error('Node.js dgram module is not supported by JSPM core in the browser');
}

var dgram = {
  _createSocketHandle: unimplemented,
  createSocket: unimplemented,
  Socket: unimplemented
};

export default dgram;
export { unimplemented as Socket, unimplemented as _createSocketHandle, unimplemented as createSocket };
