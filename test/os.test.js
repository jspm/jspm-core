import Test from './common.js';
import * as os from '../nodelibs/browser/os.js';

const test = new Test();

test.assertStrictEqual(() => os.cpus().length, navigator.hardwareConcurrency);
test.assertStrictEqual(() => typeof os.totalmem(), 'number');
test.assertStrictEqual(() => typeof os.uptime(), 'number');
test.assert(() => ['BE', 'LE'].includes(os.endianness()));

export default test;
