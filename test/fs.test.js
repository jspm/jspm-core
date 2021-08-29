import Test from './common.js';
import * as fs from '../nodelibs/browser/fs.js';

const test = new Test();

try {
  fs.appendFileSync('/dev/stdout', 'test');
  fs.appendFileSync('/dev/stderr', 'test');
} catch (e) {
  test.push(e);
}

test.assertObjectEqual(() => fs.readdirSync('/').sort(), ['dev', 'usr', 'home', 'tmp'].sort());
test.assertObjectEqual(() => fs.readdirSync('/usr'), ['bin']);

// TODO: test that stdout and stderr are console.logged and console.errored.

test.assertStrictEqual(() => fs.readFileSync('/dev/stderr', 'utf8'), 'test');
test.assertStrictEqual(() => fs.readFileSync('/dev/stdout', 'utf8'), 'test');

export default test;
