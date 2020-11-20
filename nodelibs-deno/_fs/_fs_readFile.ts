// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.
import {
  BinaryEncodings,
  BinaryOptionsArgument,
  Encodings,
  FileOptionsArgument,
  getEncoding,
  TextEncodings,
  TextOptionsArgument,
} from "./_fs_common.ts";
import { Buffer } from "../buffer.ts";
import { fileURLToPath } from '../../nodelibs/url.js';

function maybeDecode(data: Uint8Array, encoding: TextEncodings): string;
function maybeDecode(
  data: Uint8Array,
  encoding: BinaryEncodings | null,
): Buffer;
function maybeDecode(
  data: Uint8Array,
  encoding: Encodings | null,
): string | Buffer {
  const buffer = new Buffer(data.buffer, data.byteOffset, data.byteLength);
  if (encoding && encoding !== "binary") return buffer.toString(encoding);
  return buffer;
}

type TextCallback = (err: Error | null, data?: string) => void;
type BinaryCallback = (err: Error | null, data?: Buffer) => void;
type GenericCallback = (err: Error | null, data?: string | Buffer) => void;
type Callback = TextCallback | BinaryCallback | GenericCallback;

export function readFile(
  path: string | URL,
  options: TextOptionsArgument,
  callback: TextCallback,
): void;
export function readFile(
  path: string | URL,
  options: BinaryOptionsArgument,
  callback: BinaryCallback,
): void;
export function readFile(
  path: string | URL,
  options: null | undefined | FileOptionsArgument,
  callback: BinaryCallback,
): void;
export function readFile(path: string | URL, callback: BinaryCallback): void;
export function readFile(
  path: string | URL,
  optOrCallback?: FileOptionsArgument | Callback | null | undefined,
  callback?: Callback,
): void {
  path = path instanceof URL ? fileURLToPath(path) : path;
  let cb: Callback | undefined;
  if (typeof optOrCallback === "function") {
    cb = optOrCallback;
  } else {
    cb = callback;
  }

  const encoding = getEncoding(optOrCallback);

  const p = Deno.readFile(path);

  if (cb) {
    p.then((data: Uint8Array) => {
      if (encoding && encoding !== "binary") {
        const text = maybeDecode(data, encoding);
        return (cb as TextCallback)(null, text);
      }
      const buffer = maybeDecode(data, encoding);
      (cb as BinaryCallback)(null, buffer);
    }).catch((err) => {
      err.code = 'ENOENT';
      if (cb) cb(err);
    });
  }
}

export function readFileSync(
  path: string | URL,
  opt: TextOptionsArgument,
): string;
export function readFileSync(
  path: string | URL,
  opt?: BinaryOptionsArgument,
): Buffer;
export function readFileSync(
  path: string | URL,
  opt?: FileOptionsArgument,
): string | Buffer {
  path = path instanceof URL ? fileURLToPath(path) : path;
  try {
    var data = Deno.readFileSync(path);
  }
  catch (e) {
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
