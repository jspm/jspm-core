import { h } from './chunk-deebbc2f.js';
export { h as default } from './chunk-deebbc2f.js';
import { p as path } from './chunk-164ea72c.js';
import './chunk-d7b2e109.js';
import './chunk-0ffb79c6.js';
import './chunk-51fee26b.js';
import './chunk-d07c462d.js';

// Copyright Joyent, Inc. and other Node contributors.

const processPlatform = typeof Deno !== 'undefined' ? (Deno.build.os === "windows" ? "win32" : Deno.build.os) : undefined;

h.URL = typeof URL !== 'undefined' ? URL : null;
h.pathToFileURL = pathToFileURL;
h.fileURLToPath = fileURLToPath;

var Url = h.Url;
var format = h.format;
var resolve = h.resolve;
var resolveObject = h.resolveObject;

const _URL = h.URL;

const CHAR_BACKWARD_SLASH = 92;
const CHAR_FORWARD_SLASH = 47;
const CHAR_LOWERCASE_A = 97;
const CHAR_LOWERCASE_Z = 122;

const isWindows = processPlatform === 'win32';

const forwardSlashRegEx = /\//g;
const percentRegEx = /%/g;
const backslashRegEx = /\\/g;
const newlineRegEx = /\n/g;
const carriageReturnRegEx = /\r/g;
const tabRegEx = /\t/g;

/**
 * Get fully resolved platform-specific file path from the given URL string/ object
 * @param path The file URL string or URL object to convert to a path
 */
function fileURLToPath(path) {
  if (typeof path === "string") path = new URL(path);
  else if (!(path instanceof URL)) {
    throw new Deno.errors.InvalidData(
      "invalid argument path , must be a string or URL",
    );
  }
  if (path.protocol !== "file:") {
    throw new Deno.errors.InvalidData("invalid url scheme");
  }
  return isWindows ? getPathFromURLWin(path) : getPathFromURLPosix(path);
}

function getPathFromURLWin(url) {
  const hostname = url.hostname;
  let pathname = url.pathname;
  for (let n = 0; n < pathname.length; n++) {
    if (pathname[n] === "%") {
      const third = pathname.codePointAt(n + 2) || 0x20;
      if (
        (pathname[n + 1] === "2" && third === 102) || // 2f 2F /
        (pathname[n + 1] === "5" && third === 99)
      ) {
        // 5c 5C \
        throw new Deno.errors.InvalidData(
          "must not include encoded \\ or / characters",
        );
      }
    }
  }

  pathname = pathname.replace(forwardSlashRegEx, "\\");
  pathname = decodeURIComponent(pathname);
  if (hostname !== "") {
    //TODO add support for punycode encodings
    return `\\\\${hostname}${pathname}`;
  } else {
    // Otherwise, it's a local path that requires a drive letter
    const letter = pathname.codePointAt(1) | 0x20;
    const sep = pathname[2];
    if (
      letter < CHAR_LOWERCASE_A ||
      letter > CHAR_LOWERCASE_Z || // a..z A..Z
      sep !== ":"
    ) {
      throw new Deno.errors.InvalidData("file url path must be absolute");
    }
    return pathname.slice(1);
  }
}
function getPathFromURLPosix(url) {
  if (url.hostname !== "") {
    throw new Deno.errors.InvalidData("invalid file url hostname");
  }
  const pathname = url.pathname;
  for (let n = 0; n < pathname.length; n++) {
    if (pathname[n] === "%") {
      const third = pathname.codePointAt(n + 2) || 0x20;
      if (pathname[n + 1] === "2" && third === 102) {
        throw new Deno.errors.InvalidData(
          "must not include encoded / characters",
        );
      }
    }
  }
  return decodeURIComponent(pathname);
}

/** Get fully resolved platform-specific File URL from the given file path */
function pathToFileURL(filepath) {
  let resolved = path.resolve(filepath);
  // path.resolve strips trailing slashes so we must add them back
  const filePathLast = filepath.charCodeAt(filepath.length - 1);
  if (
    (filePathLast === CHAR_FORWARD_SLASH ||
      (isWindows && filePathLast === CHAR_BACKWARD_SLASH)) &&
    resolved[resolved.length - 1] !== path.sep
  ) {
    resolved += "/";
  }
  const outURL = new URL("file://");
  if (resolved.includes("%")) resolved = resolved.replace(percentRegEx, "%25");
  // In posix, "/" is a valid character in paths
  if (!isWindows && resolved.includes("\\")) {
    resolved = resolved.replace(backslashRegEx, "%5C");
  }
  if (resolved.includes("\n")) resolved = resolved.replace(newlineRegEx, "%0A");
  if (resolved.includes("\r")) {
    resolved = resolved.replace(carriageReturnRegEx, "%0D");
  }
  if (resolved.includes("\t")) resolved = resolved.replace(tabRegEx, "%09");
  outURL.pathname = resolved;
  return outURL;
}

export { _URL as URL, Url, fileURLToPath, format, pathToFileURL, resolve, resolveObject };
