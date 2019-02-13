var exports$1 = {},
    _dewExec = false;
function dew() {
  if (_dewExec) return exports$1;
  _dewExec = true;

  exports$1.isatty = function () {
    return false;
  };

  function ReadStream() {
    throw new Error('tty.ReadStream is not implemented');
  }

  exports$1.ReadStream = ReadStream;

  function WriteStream() {
    throw new Error('tty.WriteStream is not implemented');
  }

  exports$1.WriteStream = WriteStream;
  return exports$1;
}

const exports$2 = dew();
const ReadStream = exports$2.ReadStream, WriteStream = exports$2.WriteStream, isatty = exports$2.isatty;

export default exports$2;
export { ReadStream, WriteStream, isatty };
