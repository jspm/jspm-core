import { posix as posix$1 } from '../path.js';
export { posix } from '../path.js';
import '../chunk-8330aff8.js';
import '../chunk-41a25566.js';

const {
  resolve,
  normalize,
  isAbsolute,
  join,
  relative,
  _makeLong,
  dirname,
  basename,
  extname,
  format,
  parse,
  sep,
  delimiter,
  win32
} = posix$1;

var posix = {
  resolve,
  normalize,
  isAbsolute,
  join,
  relative,
  _makeLong,
  dirname,
  basename,
  extname,
  format,
  parse,
  sep,
  delimiter,
  posix: posix$1,
  win32
};

export default posix;
export { _makeLong, basename, delimiter, dirname, extname, format, isAbsolute, join, normalize, parse, relative, resolve, sep, win32 };
