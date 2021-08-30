import { promisify } from '../util.js';
import timers from '../timers.js';
import '../chunk-ff6a5e51.js';
import '../chunk-13140bc3.js';
import '../chunk-0f70056b.js';
import '../chunk-5752f882.js';

const setTimeout = promisify(timers.setTimeout),
  setImmediate = promisify(timers.setImmediate),
  setInterval = promisify(timers.setInterval);

var promises = {
  setTimeout,
  setImmediate,
  setInterval
};

export { promises as default, setImmediate, setInterval, setTimeout };
