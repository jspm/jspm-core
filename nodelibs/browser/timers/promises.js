import { promisify } from '../util.js';
import timers from '../timers.js';
import '../chunk-bf402f6f.js';
import '../chunk-b196e9ea.js';
import '../chunk-af36a440.js';
import '../chunk-41a25566.js';

const setTimeout = promisify(timers.setTimeout),
  setImmediate = promisify(timers.setImmediate),
  setInterval = promisify(timers.setInterval);

var promises = {
  setTimeout,
  setImmediate,
  setInterval
};

export default promises;
export { setImmediate, setInterval, setTimeout };
