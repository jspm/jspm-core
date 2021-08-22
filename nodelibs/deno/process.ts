// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.
import { notImplemented } from 'https://deno.land/std@0.105.0/node/_utils.ts';
import { fileURLToPath } from 'https://deno.land/std@0.105.0/node/url.ts';
import { Readable, Writable } from 'https://deno.land/std@0.105.0/node/stream.ts';
import { Buffer } from 'https://deno.land/std@0.105.0/node/buffer.ts';

/** https://nodejs.org/api/process.html#process_process_arch */
export const arch = Deno.build.arch;

/** https://nodejs.org/api/process.html#process_process_chdir_directory */
export const chdir = Deno.chdir;

/** https://nodejs.org/api/process.html#process_process_cwd */
export const cwd = Deno.cwd;

/** https://nodejs.org/api/process.html#process_process_exit_code */
export const exit = Deno.exit;

/** https://nodejs.org/api/process.html#process_process_pid */
export const pid = Deno.pid;

/** https://nodejs.org/api/process.html#process_process_platform */
export const platform = Deno.build.os === "windows" ? "win32" : Deno.build.os;

/** https://nodejs.org/api/process.html#process_process_version */
export const version = `v14.17.3`;

/** https://nodejs.org/api/process.html#process_process_versions */
export const versions = {
  node: '14.17.3',
  /*
    uv
    zlib
    brotli
    ares
    modules
    nghttp2
    napi
    llhttp
    openssl
    cldr
    icu
    tz
    unicode
  */
  ...Deno.version,
};

/** https://nodejs.org/api/process.html#process_process_nexttick_callback_args */
export function nextTick(this: unknown, cb: () => void): void;
export function nextTick<T extends Array<unknown>>(
  this: unknown,
  cb: (...args: T) => void,
  ...args: T
): void;
export function nextTick<T extends Array<unknown>>(
  this: unknown,
  cb: (...args: T) => void,
  ...args: T
) {
  if (args) {
    queueMicrotask(() => cb.call(this, ...args));
  } else {
    queueMicrotask(cb);
  }
}


interface _Readable extends Readable {
  get isTTY(): boolean;
  destroySoon: Readable['destroy'],
  fd: number;
  _isStdio: false | undefined
};

interface _Writable extends Writable {
  get isTTY(): boolean;
  get columns(): number;
  get rows(): number
  destroySoon: Writable['destroy'],
  fd: number;
  _isStdio: true,
};

// https://github.com/nodejs/node/blob/00738314828074243c9a52a228ab4c68b04259ef/lib/internal/bootstrap/switches/is_main_thread.js#L41
function createWritableStdioStream(writer: typeof Deno.stdout): _Writable {
  const stream = new Writable({
    write(buf: Uint8Array, enc: string, cb) {
      writer.writeSync(buf instanceof Uint8Array ? buf : Buffer.from(buf, enc));
      cb();
    },
    destroy(err, cb) {
      cb(err);
      this._undestroy();
      if (!this._writableState.emitClose) {
        queueMicrotask(() => this.emit('close'));
      }
    },
  }) as _Writable;
  stream.fd = writer.rid;
  stream.destroySoon = stream.destroy;
  stream._isStdio = true;
  stream.once('close', () => writer.close());
  Object.defineProperties(stream, {
    columns: {
      enumerable: true,
      configurable: true,
      get(): number {
        return Deno.consoleSize(writer.rid).columns;
      },
    },
    rows: {
      enumerable: true,
      configurable: true,
      get(): number {
        return Deno.consoleSize(writer.rid).rows;
      },
    },
    isTTY: {
      enumerable: true,
      configurable: true,
      get(): boolean {
        return Deno.isatty(writer.rid);
      },
    },
  });
  return stream;
}

export const stdin = new Readable({
  // @ts-ignore
  read(this: Readable, size: number) {
    const p = Buffer.alloc(size || 16 * 1024);
    const length = Deno.stdin.readSync(p);
    this.push(length === null ? null : p.slice(0, length));
  }
}) as _Readable;
stdin.on('close', () => Deno.stdin.close());
stdin.fd = Deno.stdin.rid;
Object.defineProperty(stdin, 'isTTY', {
  enumerable: true,
  configurable: true,
  get() {
    return Deno.isatty(Deno.stdin.rid);
  },
});

export const stderr = createWritableStdioStream(Deno.stderr);
export const stdout = createWritableStdioStream(Deno.stdout);

/** https://nodejs.org/api/process.html#process_process */
// @deprecated `import { process } from 'process'` for backwards compatibility with old deno versions
export const process = {
  arch,
  chdir,
  cwd,
  exit,
  pid,
  platform,
  version,
  versions,
  stdin,
  stderr,
  stdout,
  /** https://nodejs.org/api/process.html#process_process_events */
  // on is not exported by node, it is only available within process:
  // node --input-type=module -e "import { on } from 'process'; console.log(on)"
  // deno-lint-ignore ban-types
  on(_event: string, _callback: Function): void {
    // TODO(rsp): to be implemented
    notImplemented();
  },

  /** https://nodejs.org/api/process.html#process_process_argv */
  get argv(): string[] {
    // Getter delegates --allow-env and --allow-read until request
    // Getter also allows the export Proxy instance to function as intended
    return argv = [Deno.execPath(), Deno.mainModule.startsWith('file:') ? fileURLToPath(Deno.mainModule) : Deno.mainModule, ...Deno.args];
  },

  /** https://nodejs.org/api/process.html#process_process_env */
  get env(): { [index: string]: string } {
    // Getter delegates --allow-env and --allow-read until request
    // Getter also allows the export Proxy instance to function as intended
    return env = Deno.env.toObject();
  },
  nextTick,
};

/**
 * https://nodejs.org/api/process.html#process_process_argv
 * @example `import { argv } from './std/node/process.ts'; console.log(argv)`
 */
// Proxy delegates --allow-env and --allow-read to request time, even for exports
export let argv: any;

/**
 * https://nodejs.org/api/process.html#process_process_env
 * @example `import { env } from './std/node/process.ts'; console.log(env)`
 */
// Proxy delegates --allow-env and --allow-read to request time, even for exports
export let env: any;

// import process from './std/node/process.ts'
export default process;

Object.defineProperty(process, Symbol.toStringTag, {
  enumerable: false,
  writable: true,
  configurable: false,
  value: "process",
});
