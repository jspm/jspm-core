import { promisify } from '../util.js';
import timers from '../timers.js';
import '../chunk-bd86cb5d.js';
import '../chunk-6cc4de3c.js';
import '../chunk-debdd147.js';

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
