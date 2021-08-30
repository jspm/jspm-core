import Test from './common.js';
import { Worker } from '../nodelibs/browser/worker_threads.js';
import { once } from '../nodelibs/browser/events.js';

const test = new Test();

const worker = new Worker('./worker_threads-fixture.js');
worker.postMessage('hello2');

test.assertObjectEqual(await once(worker, 'message'), ['hello']);
test.assertObjectEqual(await once(worker, 'message'), ['received: hello2']);

export default test;
