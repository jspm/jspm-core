import { promisify } from '../util.js';
import timers from '../timers.js';
import '../chunk-ce0fbc82.js';
import '../chunk-b4205b57.js';
import '../chunk-5decc758.js';
import '../chunk-2eac56ff.js';

const setTimeout = promisify(timers.setTimeout),
  setImmediate = promisify(timers.setImmediate),
  setInterval = promisify(timers.setInterval);

var promises = {
  setTimeout,
  setImmediate,
  setInterval
};

export { promises as default, setImmediate, setInterval, setTimeout };
