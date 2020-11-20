function isatty () {
  return true;
}

function ReadStream () {
  throw new Error('tty.ReadStream is not implemented');
}

function WriteStream() {
  throw new Error('tty.WriteStream is not implemented');
}

var m = /*#__PURE__*/Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: 'Module',
  isatty: isatty,
  ReadStream: ReadStream,
  WriteStream: WriteStream
});

export default m;
export { ReadStream, WriteStream, isatty };
