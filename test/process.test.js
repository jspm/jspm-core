import Test from './common.js';
import * as process from '../nodelibs/browser/process.js';

const test = new Test();

test.assertStrictEqual(() => process.cwd(), '/');

test.assertStrictEqual(() => typeof process.uptime(), 'number');
test.assert(() => process.uptime() >= 0);
test.assertStrictEqual(() => process.hrtime().length, 2);
test.assertStrictEqual(() => typeof process.hrtime()[0], 'number');
test.assertStrictEqual(() => typeof process.hrtime()[1], 'number');
test.assert(() => process.hrtime()[0] > 0);
test.assert(() => process.hrtime()[1] >= 0);
test.assertStrictEqual(() => typeof process.hrtime.bigint(), typeof BigInt === 'undefined' ? 'number' : 'bigint');

export default test;
