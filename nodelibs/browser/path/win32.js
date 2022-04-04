import { posix } from '../path.js';
export { posix } from '../path.js';
import '../chunk-8330aff8.js';
import '../chunk-41a25566.js';

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

export default win32;
export { unimplemented as _makeLong, unimplemented as basename, unimplemented as delimiter, unimplemented as dirname, unimplemented as extname, unimplemented as format, unimplemented as isAbsolute, unimplemented as join, unimplemented as normalize, unimplemented as parse, unimplemented as relative, unimplemented as resolve, unimplemented as sep, win32 };
