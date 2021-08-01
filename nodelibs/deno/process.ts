// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.
import { notImplemented } from 'https://deno.land/std@0.103.0/node/_utils.ts';
import { fileURLToPath } from 'https://deno.land/std@0.103.0/node/url.ts';

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
  get stderr() {
    return {
      fd: Deno.stderr.rid,
      get isTTY(): boolean {
        return Deno.isatty(this.fd);
      },
      pipe(_destination: Deno.Writer, _options: { end: boolean }): void {
        // TODO(JayHelton): to be implemented
        notImplemented('stderr pipe');
      },
      // deno-lint-ignore ban-types
      write(_chunk: string | Uint8Array, _callback: Function): void {
        // TODO(JayHelton): to be implemented
        notImplemented('stderr write');
      },
      // deno-lint-ignore ban-types
      on(_event: string, _callback: Function): void {
        // TODO(JayHelton): to be implemented
        notImplemented('stderr on');
      },
    };
  },
  get stdin() {
    return {
      fd: Deno.stdin.rid,
      get isTTY(): boolean {
        return Deno.isatty(this.fd);
      },
      read(_size: number): void {
        // TODO(JayHelton): to be implemented
        notImplemented('stdin read');
      },
      // deno-lint-ignore ban-types
      on(_event: string, _callback: Function): void {
        // TODO(JayHelton): to be implemented
        notImplemented('stdin on');
      },
    };
  },
  get stdout() {
    return {
      fd: Deno.stdout.rid,
      get columns (): number {
        return Deno.consoleSize(Deno.stdout.rid).columns;
      },
      get rows (): number {
        return Deno.consoleSize(Deno.stdout.rid).rows;
      },
      get isTTY(): boolean {
        return Deno.isatty(this.fd);
      },
      pipe(_destination: Deno.Writer, _options: { end: boolean }): void {
        // TODO(JayHelton): to be implemented
        notImplemented('stdout pipe');
      },
      // deno-lint-ignore ban-types
      write(_chunk: string | Uint8Array, _callback: Function): void {
        Deno.stdout.writeSync(typeof _chunk === 'string' ? new TextEncoder().encode(_chunk) : _chunk);
      },
      // deno-lint-ignore ban-types
      on(_event: string, _callback: Function): void {
        // TODO(JayHelton): to be implemented
        notImplemented('stdout on');
      },
    };
  },

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
