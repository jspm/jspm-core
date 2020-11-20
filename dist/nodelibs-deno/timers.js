// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.
// TODO: implement the 'NodeJS.Timeout' and 'NodeJS.Immediate' versions of the timers.
// https://github.com/DefinitelyTyped/DefinitelyTyped/blob/1163ead296d84e7a3c80d71e7c81ecbd1a130e9a/types/node/v12/globals.d.ts#L1120-L1131
const setTimeout = window.setTimeout;
const clearTimeout = window.clearTimeout;
const setInterval = window.setInterval;
const clearInterval = window.clearInterval;
const setImmediate = (cb, ...args) => window.setTimeout(cb, 0, ...args);
const clearImmediate = window.clearTimeout;

var m = /*#__PURE__*/Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: 'Module',
  setTimeout: setTimeout,
  clearTimeout: clearTimeout,
  setInterval: setInterval,
  clearInterval: clearInterval,
  setImmediate: setImmediate,
  clearImmediate: clearImmediate
});

// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.

export default m;
export { clearImmediate, clearInterval, clearTimeout, setImmediate, setInterval, setTimeout };
