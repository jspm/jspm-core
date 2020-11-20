import { n as normalizeEncoding, a as notImplemented } from './chunk-d9b5bf01.js';

// Ported from Go
// https://github.com/golang/go/blob/go1.12.5/src/encoding/hex/hex.go
// Copyright 2009 The Go Authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.
// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.
const hextable = new TextEncoder().encode("0123456789abcdef");
/**
 * ErrInvalidByte takes an invalid byte and returns an Error.
 * @param byte
 */

function errInvalidByte(byte) {
  return new Error("encoding/hex: invalid byte: " + new TextDecoder().decode(new Uint8Array([byte])));
}
/** ErrLength returns an error about odd string length. */

function errLength() {
  return new Error("encoding/hex: odd length hex string");
} // fromHexChar converts a hex character into its value.

function fromHexChar(byte) {
  // '0' <= byte && byte <= '9'
  if (48 <= byte && byte <= 57) return byte - 48; // 'a' <= byte && byte <= 'f'

  if (97 <= byte && byte <= 102) return byte - 97 + 10; // 'A' <= byte && byte <= 'F'

  if (65 <= byte && byte <= 70) return byte - 65 + 10;
  throw errInvalidByte(byte);
}
/**
 * EncodedLen returns the length of an encoding of n source bytes. Specifically,
 * it returns n * 2.
 * @param n
 */


function encodedLen(n) {
  return n * 2;
}
/**
 * Encode encodes `src` into `encodedLen(src.length)` bytes.
 * @param src
 */

function encode(src) {
  const dst = new Uint8Array(encodedLen(src.length));

  for (let i = 0; i < dst.length; i++) {
    const v = src[i];
    dst[i * 2] = hextable[v >> 4];
    dst[i * 2 + 1] = hextable[v & 0x0f];
  }

  return dst;
}
/**
 * EncodeToString returns the hexadecimal encoding of `src`.
 * @param src
 */

function encodeToString(src) {
  return new TextDecoder().decode(encode(src));
}
/**
 * Decode decodes `src` into `decodedLen(src.length)` bytes
 * If the input is malformed an error will be thrown
 * the error.
 * @param src
 */

function decode(src) {
  const dst = new Uint8Array(decodedLen(src.length));

  for (let i = 0; i < dst.length; i++) {
    const a = fromHexChar(src[i * 2]);
    const b = fromHexChar(src[i * 2 + 1]);
    dst[i] = a << 4 | b;
  }

  if (src.length % 2 == 1) {
    // Check for invalid char before reporting bad length,
    // since the invalid char (if present) is an earlier problem.
    fromHexChar(src[dst.length * 2]);
    throw errLength();
  }

  return dst;
}
/**
 * DecodedLen returns the length of decoding `x` source bytes.
 * Specifically, it returns `x / 2`.
 * @param x
 */

function decodedLen(x) {
  return x >>> 1;
}
/**
 * DecodeString returns the bytes represented by the hexadecimal string `s`.
 * DecodeString expects that src contains only hexadecimal characters and that
 * src has even length.
 * If the input is malformed, DecodeString will throw an error.
 * @param s the `string` to decode to `Uint8Array`
 */

function decodeString(s) {
  return decode(new TextEncoder().encode(s));
}

// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.
// deno-fmt-ignore
const base64abc = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "/"];
/**
 * CREDIT: https://gist.github.com/enepomnyaschih/72c423f727d395eeaa09697058238727
 * Encodes a given Uint8Array, ArrayBuffer or string into RFC4648 base64 representation
 * @param data
 */

function encode$1(data) {
  const uint8 = typeof data === "string" ? new TextEncoder().encode(data) : data instanceof Uint8Array ? data : new Uint8Array(data);
  let result = "",
      i;
  const l = uint8.length;

  for (i = 2; i < l; i += 3) {
    result += base64abc[uint8[i - 2] >> 2];
    result += base64abc[(uint8[i - 2] & 0x03) << 4 | uint8[i - 1] >> 4];
    result += base64abc[(uint8[i - 1] & 0x0f) << 2 | uint8[i] >> 6];
    result += base64abc[uint8[i] & 0x3f];
  }

  if (i === l + 1) {
    // 1 octet yet to write
    result += base64abc[uint8[i - 2] >> 2];
    result += base64abc[(uint8[i - 2] & 0x03) << 4];
    result += "==";
  }

  if (i === l) {
    // 2 octets yet to write
    result += base64abc[uint8[i - 2] >> 2];
    result += base64abc[(uint8[i - 2] & 0x03) << 4 | uint8[i - 1] >> 4];
    result += base64abc[(uint8[i - 1] & 0x0f) << 2];
    result += "=";
  }

  return result;
}
/**
 * Decodes a given RFC4648 base64 encoded string
 * @param b64
 */

function decode$1(b64) {
  const binString = atob(b64);
  const size = binString.length;
  const bytes = new Uint8Array(size);

  for (let i = 0; i < size; i++) {
    bytes[i] = binString.charCodeAt(i);
  }

  return bytes;
}

// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.
const notImplementedEncodings = ["ascii", "binary", "latin1", "ucs2", "utf16le"];

function checkEncoding(encoding = "utf8", strict = true) {
  if (typeof encoding !== "string" || strict && encoding === "") {
    if (!strict) return "utf8";
    throw new TypeError(`Unkown encoding: ${encoding}`);
  }

  const normalized = normalizeEncoding(encoding);

  if (normalized === undefined) {
    throw new TypeError(`Unkown encoding: ${encoding}`);
  }

  if (notImplementedEncodings.includes(encoding)) {
    notImplemented(`"${encoding}" encoding`);
  }

  return normalized;
}

// https://github.com/nodejs/node/blob/56dbe466fdbc598baea3bfce289bf52b97b8b8f7/lib/buffer.js#L598
const encodingOps = {
  utf8: {
    byteLength: string => new TextEncoder().encode(string).byteLength
  },
  ucs2: {
    byteLength: string => string.length * 2
  },
  utf16le: {
    byteLength: string => string.length * 2
  },
  latin1: {
    byteLength: string => string.length
  },
  ascii: {
    byteLength: string => string.length
  },
  base64: {
    byteLength: string => base64ByteLength(string, string.length)
  },
  hex: {
    byteLength: string => string.length >>> 1
  }
};

function base64ByteLength(str, bytes) {
  // Handle padding
  if (str.charCodeAt(bytes - 1) === 0x3d) bytes--;
  if (bytes > 1 && str.charCodeAt(bytes - 1) === 0x3d) bytes--; // Base64 ratio: 3/4

  return bytes * 3 >>> 2;
}
/**
 * See also https://nodejs.org/api/buffer.html
 */


class Buffer extends Uint8Array {
  /**
   * Allocates a new Buffer of size bytes.
   */
  static alloc(size, fill, encoding = "utf8") {
    if (typeof size !== "number") {
      throw new TypeError(`The "size" argument must be of type number. Received type ${typeof size}`);
    }

    const buf = new Buffer(size);
    if (size === 0) return buf;
    let bufFill;

    if (typeof fill === "string") {
      encoding = checkEncoding(encoding);

      if (typeof fill === "string" && fill.length === 1 && encoding === "utf8") {
        buf.fill(fill.charCodeAt(0));
      } else bufFill = Buffer.from(fill, encoding);
    } else if (typeof fill === "number") {
      buf.fill(fill);
    } else if (fill instanceof Uint8Array) {
      if (fill.length === 0) {
        throw new TypeError(`The argument "value" is invalid. Received ${fill.constructor.name} []`);
      }

      bufFill = fill;
    }

    if (bufFill) {
      if (bufFill.length > buf.length) {
        bufFill = bufFill.subarray(0, buf.length);
      }

      let offset = 0;

      while (offset < size) {
        buf.set(bufFill, offset);
        offset += bufFill.length;
        if (offset + bufFill.length >= size) break;
      }

      if (offset !== size) {
        buf.set(bufFill.subarray(0, size - offset), offset);
      }
    }

    return buf;
  }

  static allocUnsafe(size) {
    return new Buffer(size);
  }
  /**
   * Returns the byte length of a string when encoded. This is not the same as
   * String.prototype.length, which does not account for the encoding that is
   * used to convert the string into bytes.
   */


  static byteLength(string, encoding = "utf8") {
    if (typeof string != "string") return string.byteLength;
    encoding = normalizeEncoding(encoding) || "utf8";
    return encodingOps[encoding].byteLength(string);
  }
  /**
   * Returns a new Buffer which is the result of concatenating all the Buffer
   * instances in the list together.
   */


  static concat(list, totalLength) {
    if (totalLength == undefined) {
      totalLength = 0;

      for (const buf of list) {
        totalLength += buf.length;
      }
    }

    const buffer = Buffer.allocUnsafe(totalLength);
    let pos = 0;

    for (const item of list) {
      let buf;

      if (!(item instanceof Buffer)) {
        buf = Buffer.from(item);
      } else {
        buf = item;
      }

      buf.copy(buffer, pos);
      pos += buf.length;
    }

    return buffer;
  }
  /**
   * Allocates a new Buffer using an array of bytes in the range 0 – 255. Array
   * entries outside that range will be truncated to fit into it.
   */


  static from( // deno-lint-ignore no-explicit-any
  value, offsetOrEncoding, length) {
    const offset = typeof offsetOrEncoding === "string" ? undefined : offsetOrEncoding;
    let encoding = typeof offsetOrEncoding === "string" ? offsetOrEncoding : undefined;

    if (typeof value == "string") {
      encoding = checkEncoding(encoding, false);
      if (encoding === "hex") return new Buffer(decodeString(value).buffer);
      if (encoding === "base64") return new Buffer(decode$1(value).buffer);
      return new Buffer(new TextEncoder().encode(value).buffer);
    } // workaround for https://github.com/microsoft/TypeScript/issues/38446


    return new Buffer(value, offset, length);
  }
  /**
   * Returns true if obj is a Buffer, false otherwise.
   */


  static isBuffer(obj) {
    return obj instanceof Buffer;
  } // deno-lint-ignore no-explicit-any


  static isEncoding(encoding) {
    return typeof encoding === "string" && encoding.length !== 0 && normalizeEncoding(encoding) !== undefined;
  }
  /**
   * Copies data from a region of buf to a region in target, even if the target
   * memory region overlaps with buf.
   */


  copy(targetBuffer, targetStart = 0, sourceStart = 0, sourceEnd = this.length) {
    const sourceBuffer = this.subarray(sourceStart, sourceEnd).subarray(0, Math.max(0, targetBuffer.length - targetStart));
    if (sourceBuffer.length === 0) return 0;
    targetBuffer.set(sourceBuffer, targetStart);
    return sourceBuffer.length;
  }
  /*
   * Returns true if both buf and otherBuffer have exactly the same bytes, false otherwise.
   */


  equals(otherBuffer) {
    if (!(otherBuffer instanceof Uint8Array)) {
      throw new TypeError(`The "otherBuffer" argument must be an instance of Buffer or Uint8Array. Received type ${typeof otherBuffer}`);
    }

    if (this === otherBuffer) return true;
    if (this.byteLength !== otherBuffer.byteLength) return false;

    for (let i = 0; i < this.length; i++) {
      if (this[i] !== otherBuffer[i]) return false;
    }

    return true;
  }

  readBigInt64BE(offset = 0) {
    return new DataView(this.buffer, this.byteOffset, this.byteLength).getBigInt64(offset);
  }

  readBigInt64LE(offset = 0) {
    return new DataView(this.buffer, this.byteOffset, this.byteLength).getBigInt64(offset, true);
  }

  readBigUInt64BE(offset = 0) {
    return new DataView(this.buffer, this.byteOffset, this.byteLength).getBigUint64(offset);
  }

  readBigUInt64LE(offset = 0) {
    return new DataView(this.buffer, this.byteOffset, this.byteLength).getBigUint64(offset, true);
  }

  readDoubleBE(offset = 0) {
    return new DataView(this.buffer, this.byteOffset, this.byteLength).getFloat64(offset);
  }

  readDoubleLE(offset = 0) {
    return new DataView(this.buffer, this.byteOffset, this.byteLength).getFloat64(offset, true);
  }

  readFloatBE(offset = 0) {
    return new DataView(this.buffer, this.byteOffset, this.byteLength).getFloat32(offset);
  }

  readFloatLE(offset = 0) {
    return new DataView(this.buffer, this.byteOffset, this.byteLength).getFloat32(offset, true);
  }

  readInt8(offset = 0) {
    return new DataView(this.buffer, this.byteOffset, this.byteLength).getInt8(offset);
  }

  readInt16BE(offset = 0) {
    return new DataView(this.buffer, this.byteOffset, this.byteLength).getInt16(offset);
  }

  readInt16LE(offset = 0) {
    return new DataView(this.buffer, this.byteOffset, this.byteLength).getInt16(offset, true);
  }

  readInt32BE(offset = 0) {
    return new DataView(this.buffer, this.byteOffset, this.byteLength).getInt32(offset);
  }

  readInt32LE(offset = 0) {
    return new DataView(this.buffer, this.byteOffset, this.byteLength).getInt32(offset, true);
  }

  readUInt8(offset = 0) {
    return new DataView(this.buffer, this.byteOffset, this.byteLength).getUint8(offset);
  }

  readUInt16BE(offset = 0) {
    return new DataView(this.buffer, this.byteOffset, this.byteLength).getUint16(offset);
  }

  readUInt16LE(offset = 0) {
    return new DataView(this.buffer, this.byteOffset, this.byteLength).getUint16(offset, true);
  }

  readUInt32BE(offset = 0) {
    return new DataView(this.buffer, this.byteOffset, this.byteLength).getUint32(offset);
  }

  readUInt32LE(offset = 0) {
    return new DataView(this.buffer, this.byteOffset, this.byteLength).getUint32(offset, true);
  }
  /**
   * Returns a new Buffer that references the same memory as the original, but
   * offset and cropped by the start and end indices.
   */


  slice(begin = 0, end = this.length) {
    // workaround for https://github.com/microsoft/TypeScript/issues/38665
    return this.subarray(begin, end);
  }
  /**
   * Returns a JSON representation of buf. JSON.stringify() implicitly calls
   * this function when stringifying a Buffer instance.
   */


  toJSON() {
    return {
      type: "Buffer",
      data: Array.from(this)
    };
  }
  /**
   * Decodes buf to a string according to the specified character encoding in
   * encoding. start and end may be passed to decode only a subset of buf.
   */


  toString(encoding = "utf8", start = 0, end = this.length) {
    encoding = checkEncoding(encoding);
    const b = this.subarray(start, end);
    if (encoding === "hex") return encodeToString(b);
    if (encoding === "base64") return encode$1(b.buffer);
    return new TextDecoder(encoding).decode(b);
  }
  /**
   * Writes string to buf at offset according to the character encoding in
   * encoding. The length parameter is the number of bytes to write. If buf did
   * not contain enough space to fit the entire string, only part of string will
   * be written. However, partially encoded characters will not be written.
   */


  write(string, offset = 0, length = this.length) {
    return new TextEncoder().encodeInto(string, this.subarray(offset, offset + length)).written;
  }

  writeBigInt64BE(value, offset = 0) {
    new DataView(this.buffer, this.byteOffset, this.byteLength).setBigInt64(offset, value);
    return offset + 4;
  }

  writeBigInt64LE(value, offset = 0) {
    new DataView(this.buffer, this.byteOffset, this.byteLength).setBigInt64(offset, value, true);
    return offset + 4;
  }

  writeBigUInt64BE(value, offset = 0) {
    new DataView(this.buffer, this.byteOffset, this.byteLength).setBigUint64(offset, value);
    return offset + 4;
  }

  writeBigUInt64LE(value, offset = 0) {
    new DataView(this.buffer, this.byteOffset, this.byteLength).setBigUint64(offset, value, true);
    return offset + 4;
  }

  writeDoubleBE(value, offset = 0) {
    new DataView(this.buffer, this.byteOffset, this.byteLength).setFloat64(offset, value);
    return offset + 8;
  }

  writeDoubleLE(value, offset = 0) {
    new DataView(this.buffer, this.byteOffset, this.byteLength).setFloat64(offset, value, true);
    return offset + 8;
  }

  writeFloatBE(value, offset = 0) {
    new DataView(this.buffer, this.byteOffset, this.byteLength).setFloat32(offset, value);
    return offset + 4;
  }

  writeFloatLE(value, offset = 0) {
    new DataView(this.buffer, this.byteOffset, this.byteLength).setFloat32(offset, value, true);
    return offset + 4;
  }

  writeInt8(value, offset = 0) {
    new DataView(this.buffer, this.byteOffset, this.byteLength).setInt8(offset, value);
    return offset + 1;
  }

  writeInt16BE(value, offset = 0) {
    new DataView(this.buffer, this.byteOffset, this.byteLength).setInt16(offset, value);
    return offset + 2;
  }

  writeInt16LE(value, offset = 0) {
    new DataView(this.buffer, this.byteOffset, this.byteLength).setInt16(offset, value, true);
    return offset + 2;
  }

  writeInt32BE(value, offset = 0) {
    new DataView(this.buffer, this.byteOffset, this.byteLength).setUint32(offset, value);
    return offset + 4;
  }

  writeInt32LE(value, offset = 0) {
    new DataView(this.buffer, this.byteOffset, this.byteLength).setInt32(offset, value, true);
    return offset + 4;
  }

  writeUInt8(value, offset = 0) {
    new DataView(this.buffer, this.byteOffset, this.byteLength).setUint8(offset, value);
    return offset + 1;
  }

  writeUInt16BE(value, offset = 0) {
    new DataView(this.buffer, this.byteOffset, this.byteLength).setUint16(offset, value);
    return offset + 2;
  }

  writeUInt16LE(value, offset = 0) {
    new DataView(this.buffer, this.byteOffset, this.byteLength).setUint16(offset, value, true);
    return offset + 2;
  }

  writeUInt32BE(value, offset = 0) {
    new DataView(this.buffer, this.byteOffset, this.byteLength).setUint32(offset, value);
    return offset + 4;
  }

  writeUInt32LE(value, offset = 0) {
    new DataView(this.buffer, this.byteOffset, this.byteLength).setUint32(offset, value, true);
    return offset + 4;
  }

}

var m = /*#__PURE__*/Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: 'Module',
  Buffer: Buffer
});

export { Buffer as B, encodeToString as a, decode$1 as d, encode$1 as e, m };
