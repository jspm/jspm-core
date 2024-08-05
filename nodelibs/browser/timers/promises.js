import { promisify } from '../util.js';
import exports from '../timers.js';
import '../chunk-BZgdGiNw.js';
import '../chunk-D04hy_Cu.js';
import '../chunk-DEckhzyo.js';
import '../chunk-b0rmRow7.js';

const setTimeout = promisify(exports.setTimeout),
  setImmediate = promisify(exports.setImmediate),
  setInterval = promisify(exports.setInterval);

var promises = {
  setTimeout,
  setImmediate,
  setInterval
};

export { promises as default, setImmediate, setInterval, setTimeout };
