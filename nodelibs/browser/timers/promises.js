import { promisify } from '../util.js';
import exports from '../timers.js';
import '../chunk-739d4e67.js';
import '../chunk-566596b9.js';
import '../chunk-32df7659.js';
import '../chunk-6ad9b8b8.js';

const setTimeout = promisify(exports.setTimeout),
  setImmediate = promisify(exports.setImmediate),
  setInterval = promisify(exports.setInterval);

var promises = {
  setTimeout,
  setImmediate,
  setInterval
};

export { promises as default, setImmediate, setInterval, setTimeout };
