import { promisify } from '../util.js';
import exports from '../timers.js';
import '../chunk-50aa119c.js';
import '../chunk-8b7cc49c.js';
import '../chunk-4a97e952.js';
import '../chunk-830ada85.js';

const setTimeout = promisify(exports.setTimeout),
  setImmediate = promisify(exports.setImmediate),
  setInterval = promisify(exports.setInterval);

var promises = {
  setTimeout,
  setImmediate,
  setInterval
};

export { promises as default, setImmediate, setInterval, setTimeout };
