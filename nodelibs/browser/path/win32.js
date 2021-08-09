import { posix } from '../path.js';
export { posix } from '../path.js';
import '../chunk-164ea72c.js';
import '../chunk-d07c462d.js';

function unimplemented () {
  throw new Error('Node.js path/win32 module is not supported by JSPM core in the browser');
}

const win32 = {
  resolve: unimplemented,
  normalize: unimplemented,
  isAbsolute: unimplemented,
  join: unimplemented,
  relative: unimplemented,
  _makeLong: unimplemented,
  dirname: unimplemented,
  basename: unimplemented,
  extname: unimplemented,
  format: unimplemented,
  parse: unimplemented,
  sep: unimplemented,
  delimiter: unimplemented,
  posix,
};
win32.win32 = win32;

export { unimplemented as _makeLong, unimplemented as basename, win32 as default, unimplemented as delimiter, unimplemented as dirname, unimplemented as extname, unimplemented as format, unimplemented as isAbsolute, unimplemented as join, unimplemented as normalize, unimplemented as parse, unimplemented as relative, unimplemented as resolve, unimplemented as sep, win32 };
