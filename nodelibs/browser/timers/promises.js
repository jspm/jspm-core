import { promisify } from '../util.js';
import timers from '../timers.js';
import '../chunk-1f427064.js';
import '../chunk-d49beef2.js';
import '../chunk-51fee26b.js';
import '../chunk-d07c462d.js';

const setTimeout = promisify(timers.setTimeout),
  setImmediate = promisify(timers.setImmediate),
  setInterval = promisify(timers.setInterval);

var promises = {
  setTimeout,
  setImmediate,
  setInterval
};

export { promises as default, setImmediate, setInterval, setTimeout };
