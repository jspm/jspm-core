import { a as notImplemented } from './chunk-d9b5bf01.js';
import { f as fileURLToPath } from './chunk-4212b94d.js';

// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.
/** https://nodejs.org/api/process.html#process_process_arch */

const arch = Deno.build.arch;
/** https://nodejs.org/api/process.html#process_process_chdir_directory */

const chdir = Deno.chdir;
/** https://nodejs.org/api/process.html#process_process_cwd */

const cwd = Deno.cwd;
/** https://nodejs.org/api/process.html#process_process_exit_code */

const exit = Deno.exit;
/** https://nodejs.org/api/process.html#process_process_pid */

const pid = Deno.pid;
/** https://nodejs.org/api/process.html#process_process_platform */

const platform = Deno.build.os === "windows" ? "win32" : Deno.build.os;
/** https://nodejs.org/api/process.html#process_process_version */

const version = `v${Deno.version.deno}`;
/** https://nodejs.org/api/process.html#process_process_versions */

const versions = {
  node: Deno.version.deno,
  ...Deno.version
};
/** https://nodejs.org/api/process.html#process_process_nexttick_callback_args */

function nextTick(cb, ...args) {
  if (args) {
    queueMicrotask(() => cb.call(this, ...args));
  } else {
    queueMicrotask(cb);
  }
}
/** https://nodejs.org/api/process.html#process_process */
// @deprecated `import { process } from 'process'` for backwards compatibility with old deno versions

const process = {
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

      get isTTY() {
        return Deno.isatty(this.fd);
      },

      pipe(_destination, _options) {
        // TODO(JayHelton): to be implemented
        notImplemented('stderr pipe');
      },

      // deno-lint-ignore ban-types
      write(_chunk, _callback) {
        // TODO(JayHelton): to be implemented
        notImplemented('stderr write');
      },

      // deno-lint-ignore ban-types
      on(_event, _callback) {
        // TODO(JayHelton): to be implemented
        notImplemented('stderr on');
      }

    };
  },

  get stdin() {
    return {
      fd: Deno.stdin.rid,

      get isTTY() {
        return Deno.isatty(this.fd);
      },

      read(_size) {
        // TODO(JayHelton): to be implemented
        notImplemented('stdin read');
      },

      // deno-lint-ignore ban-types
      on(_event, _callback) {
        // TODO(JayHelton): to be implemented
        notImplemented('stdin on');
      }

    };
  },

  get stdout() {
    return {
      fd: Deno.stdout.rid,

      get columns() {
        return Deno.consoleSize(Deno.stdout.rid).columns;
      },

      get rows() {
        return Deno.consoleSize(Deno.stdout.rid).rows;
      },

      get isTTY() {
        return Deno.isatty(this.fd);
      },

      pipe(_destination, _options) {
        // TODO(JayHelton): to be implemented
        notImplemented('stdout pipe');
      },

      // deno-lint-ignore ban-types
      write(_chunk, _callback) {
        Deno.stdout.writeSync(typeof _chunk === 'string' ? new TextEncoder().encode(_chunk) : _chunk);
      },

      // deno-lint-ignore ban-types
      on(_event, _callback) {
        // TODO(JayHelton): to be implemented
        notImplemented('stdout on');
      }

    };
  },

  /** https://nodejs.org/api/process.html#process_process_events */
  // on is not exported by node, it is only available within process:
  // node --input-type=module -e "import { on } from 'process'; console.log(on)"
  // deno-lint-ignore ban-types
  on(_event, _callback) {
    // TODO(rsp): to be implemented
    notImplemented();
  },

  /** https://nodejs.org/api/process.html#process_process_argv */
  get argv() {
    // Getter delegates --allow-env and --allow-read until request
    // Getter also allows the export Proxy instance to function as intended
    return argv = [Deno.execPath(), Deno.mainModule.startsWith('file:') ? fileURLToPath(Deno.mainModule) : Deno.mainModule, ...Deno.args];
  },

  /** https://nodejs.org/api/process.html#process_process_env */
  get env() {
    // Getter delegates --allow-env and --allow-read until request
    // Getter also allows the export Proxy instance to function as intended
    return env = Deno.env.toObject();
  },

  nextTick
};
/**
 * https://nodejs.org/api/process.html#process_process_argv
 * @example `import { argv } from './std/node/process.ts'; console.log(argv)`
 */
// Proxy delegates --allow-env and --allow-read to request time, even for exports

let argv;
/**
 * https://nodejs.org/api/process.html#process_process_env
 * @example `import { env } from './std/node/process.ts'; console.log(env)`
 */
// Proxy delegates --allow-env and --allow-read to request time, even for exports

let env; // import process from './std/node/process.ts'
Object.defineProperty(process, Symbol.toStringTag, {
  enumerable: false,
  writable: true,
  configurable: false,
  value: "process"
});

export default process;
export { arch, argv, chdir, cwd, env, exit, nextTick, pid, platform, process, version, versions };
