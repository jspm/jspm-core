import { posix } from 'https://deno.land/std@0.105.0/node/path.ts';

export const {
  resolve,
  normalize,
  isAbsolute,
  join,
  relative,
  // _makeLong,
  dirname,
  basename,
  extname,
  format,
  parse,
  sep,
  delimiter,
  // win32
} = posix;

export { posix }

export default {
  resolve,
  normalize,
  isAbsolute,
  join,
  relative,
  // _makeLong,
  dirname,
  basename,
  extname,
  format,
  parse,
  sep,
  delimiter,
  posix,
  // win32
};
