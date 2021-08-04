import { posix as posix$1 } from '../path.js';
export { posix } from '../path.js';
import '../chunk-164ea72c.js';
import '../chunk-d07c462d.js';

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

export { _makeLong, basename, posix as default, delimiter, dirname, extname, format, isAbsolute, join, normalize, parse, relative, resolve, sep, win32 };
