import { B as Buffer } from './chunk-b16434e4.js';
import { a as notImplemented } from './chunk-d9b5bf01.js';
import { f as fileURLToPath } from './chunk-4212b94d.js';

// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.
function isFileOptions(fileOptions) {
  if (!fileOptions) return false;
  return fileOptions.encoding != undefined || fileOptions.flag != undefined || fileOptions.mode != undefined;
}
function getEncoding(optOrCallback) {
  if (!optOrCallback || typeof optOrCallback === "function") {
    return null;
  }

  const encoding = typeof optOrCallback === "string" ? optOrCallback : optOrCallback.encoding;
  if (!encoding) return null;
  return encoding;
}
function checkEncoding(encoding) {
  if (!encoding) return null;
  encoding = encoding.toLowerCase();
  if (["utf8", "hex", "base64"].includes(encoding)) return encoding;

  if (encoding === "utf-8") {
    return "utf8";
  }

  if (encoding === "binary") {
    return "binary"; // before this was buffer, however buffer is not used in Node
    // node -e "require('fs').readFile('../world.txt', 'buffer', console.log)"
  }

  const notImplementedEncodings = ["utf16le", "latin1", "ascii", "ucs2"];

  if (notImplementedEncodings.includes(encoding)) {
    notImplemented(`"${encoding}" encoding`);
  }

  throw new Error(`The value "${encoding}" is invalid for option "encoding"`);
}
function getOpenOptions(flag) {
  if (!flag) {
    return {
      create: true,
      append: true
    };
  }

  let openOptions;

  switch (flag) {
    case "a":
      {
        // 'a': Open file for appending. The file is created if it does not exist.
        openOptions = {
          create: true,
          append: true
        };
        break;
      }

    case "ax":
      {
        // 'ax': Like 'a' but fails if the path exists.
        openOptions = {
          createNew: true,
          write: true,
          append: true
        };
        break;
      }

    case "a+":
      {
        // 'a+': Open file for reading and appending. The file is created if it does not exist.
        openOptions = {
          read: true,
          create: true,
          append: true
        };
        break;
      }

    case "ax+":
      {
        // 'ax+': Like 'a+' but fails if the path exists.
        openOptions = {
          read: true,
          createNew: true,
          append: true
        };
        break;
      }

    case "r":
      {
        // 'r': Open file for reading. An exception occurs if the file does not exist.
        openOptions = {
          read: true
        };
        break;
      }

    case "r+":
      {
        // 'r+': Open file for reading and writing. An exception occurs if the file does not exist.
        openOptions = {
          read: true,
          write: true
        };
        break;
      }

    case "w":
      {
        // 'w': Open file for writing. The file is created (if it does not exist) or truncated (if it exists).
        openOptions = {
          create: true,
          write: true,
          truncate: true
        };
        break;
      }

    case "wx":
      {
        // 'wx': Like 'w' but fails if the path exists.
        openOptions = {
          createNew: true,
          write: true
        };
        break;
      }

    case "w+":
      {
        // 'w+': Open file for reading and writing. The file is created (if it does not exist) or truncated (if it exists).
        openOptions = {
          create: true,
          write: true,
          truncate: true,
          read: true
        };
        break;
      }

    case "wx+":
      {
        // 'wx+': Like 'w+' but fails if the path exists.
        openOptions = {
          createNew: true,
          write: true,
          read: true
        };
        break;
      }

    case "as":
      {
        // 'as': Open file for appending in synchronous mode. The file is created if it does not exist.
        openOptions = {
          create: true,
          append: true
        };
        break;
      }

    case "as+":
      {
        // 'as+': Open file for reading and appending in synchronous mode. The file is created if it does not exist.
        openOptions = {
          create: true,
          read: true,
          append: true
        };
        break;
      }

    case "rs+":
      {
        // 'rs+': Open file for reading and writing in synchronous mode. Instructs the operating system to bypass the local file system cache.
        openOptions = {
          create: true,
          read: true,
          write: true
        };
        break;
      }

    default:
      {
        throw new Error(`Unrecognized file system flag: ${flag}`);
      }
  }

  return openOptions;
}

// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.
function writeFile(pathOrRid, data, optOrCallback, callback) {
  const callbackFn = optOrCallback instanceof Function ? optOrCallback : callback;
  const options = optOrCallback instanceof Function ? undefined : optOrCallback;

  if (!callbackFn) {
    throw new TypeError("Callback must be a function.");
  }

  pathOrRid = pathOrRid instanceof URL ? fileURLToPath(pathOrRid) : pathOrRid;
  const flag = isFileOptions(options) ? options.flag : undefined;
  const mode = isFileOptions(options) ? options.mode : undefined;
  const encoding = checkEncoding(getEncoding(options)) || "utf8";
  const openOptions = getOpenOptions(flag || "w");
  if (typeof data === "string") data = Buffer.from(data, encoding);
  const isRid = typeof pathOrRid === "number";
  let file;
  let error = null;

  (async () => {
    try {
      file = isRid ? new Deno.File(pathOrRid) : await Deno.open(pathOrRid, openOptions);

      if (!isRid && mode) {
        if (Deno.build.os === "windows") notImplemented(`"mode" on Windows`);
        await Deno.chmod(pathOrRid, mode);
      }

      await Deno.writeAll(file, data);
    } catch (e) {
      error = e;
    } finally {
      // Make sure to close resource
      if (!isRid && file) file.close();
      callbackFn(error);
    }
  })();
}
function writeFileSync(pathOrRid, data, options) {
  pathOrRid = pathOrRid instanceof URL ? fileURLToPath(pathOrRid) : pathOrRid;
  const flag = isFileOptions(options) ? options.flag : undefined;
  const mode = isFileOptions(options) ? options.mode : undefined;
  const encoding = checkEncoding(getEncoding(options)) || "utf8";
  const openOptions = getOpenOptions(flag || "w");
  if (typeof data === "string") data = Buffer.from(data, encoding);
  const isRid = typeof pathOrRid === "number";
  let file;
  let error = null;

  try {
    file = isRid ? new Deno.File(pathOrRid) : Deno.openSync(pathOrRid, openOptions);

    if (!isRid && mode) {
      if (Deno.build.os === "windows") notImplemented(`"mode" on Windows`);
      Deno.chmodSync(pathOrRid, mode);
    }

    Deno.writeAllSync(file, data);
  } catch (e) {
    error = e;
  } finally {
    // Make sure to close resource
    if (!isRid && file) file.close();
    if (error) throw error;
  }
}

// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.
function writeFile$1(pathOrRid, data, options) {
  return new Promise((resolve, reject) => {
    writeFile(pathOrRid, data, options, err => {
      if (err) return reject(err);
      resolve();
    });
  });
}

// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.

function maybeDecode(data, encoding) {
  const buffer = new Buffer(data.buffer, data.byteOffset, data.byteLength);
  if (encoding && encoding !== "binary") return buffer.toString(encoding);
  return buffer;
}

function readFile(path, optOrCallback, callback) {
  path = path instanceof URL ? fileURLToPath(path) : path;
  let cb;

  if (typeof optOrCallback === "function") {
    cb = optOrCallback;
  } else {
    cb = callback;
  }

  const encoding = getEncoding(optOrCallback);
  const p = Deno.readFile(path);

  if (cb) {
    p.then(data => {
      if (encoding && encoding !== "binary") {
        const text = maybeDecode(data, encoding);
        return cb(null, text);
      }

      const buffer = maybeDecode(data, encoding);
      cb(null, buffer);
    }).catch(err => {
      err.code = 'ENOENT';
      if (cb) cb(err);
    });
  }
}
function readFileSync(path, opt) {
  path = path instanceof URL ? fileURLToPath(path) : path;

  try {
    var data = Deno.readFileSync(path);
  } catch (e) {
    e.code = 'ENOENT';
    throw e;
  }

  const encoding = getEncoding(opt);

  if (encoding && encoding !== "binary") {
    const text = maybeDecode(data, encoding);
    return text;
  }

  const buffer = maybeDecode(data, encoding);
  return buffer;
}

// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.
function readFile$1(path, options) {
  return new Promise((resolve, reject) => {
    readFile(path, options, (err, data) => {
      if (err) return reject(err);

      if (data == null) {
        return reject(new Error("Invalid state: data missing, but no error"));
      }

      resolve(data);
    });
  });
}

var promises = /*#__PURE__*/Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: 'Module',
  writeFile: writeFile$1,
  readFile: readFile$1
});

export { readFile as a, readFileSync as b, writeFile as c, writeFileSync as d, getOpenOptions as g, isFileOptions as i, promises as p, readFile$1 as r, writeFile$1 as w };
