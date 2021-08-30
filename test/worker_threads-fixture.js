import { parentPort } from '../nodelibs/browser/worker_threads.js';
import { once } from '../nodelibs/browser/events.js';

parentPort.postMessage('hello');
parentPort.postMessage(`received: ${(await once(parentPort, 'message'))[0]}`);
