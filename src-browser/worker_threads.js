import { EventEmitter } from 'events';

function unimplemented(name) {
  throw new Error(
    `Node.js worker_threads ${name} is not currently supported by JSPM core in Deno`,
  );
}

let environmentData = new Map();
let threads = 0;

export class Worker extends globalThis.Worker {
  resourceLimits = {
    maxYoungGenerationSizeMb: -1,
    maxOldGenerationSizeMb: -1,
    codeRangeSizeMb: -1,
    stackSizeMb: 4,
  };

  constructor(specifier, options) {
    super(specifier, { ...(options || {}), type: 'module' });
    EventEmitter.call(this);
    this.addEventListener('error', (event) => this.emit('error', event.error || event.message));
    this.addEventListener('messageerror', (event) => this.emit('messageerror', event.data));
    this.addEventListener('message', (event) => this.emit('message', event.data));
    this.postMessage({
      environmentData,
      threadId: (this.threadId = ++threads),
      workerData: options?.workerData,
    }, options?.transferList || []);
    this.emit('online');
  }

  terminate() {
    super.terminate();
    this.emit('exit', 0);
  }

  getHeapSnapshot = () => unimplemented('Worker#getHeapsnapshot');
  // fake performance
  performance = globalThis.performance;
}
Object.assign(Worker.prototype, EventEmitter.prototype)

export const isMainThread = typeof WorkerGlobalScope === 'undefined' || self instanceof WorkerGlobalScope === false;
// fake resourceLimits
export const resourceLimits = isMainThread ? {} : {
  maxYoungGenerationSizeMb: 48,
  maxOldGenerationSizeMb: 2048,
  codeRangeSizeMb: 0,
  stackSizeMb: 4,
};

let threadId = 0;
let workerData = null;
let parentPort = null;

if (!isMainThread) {
  ({ threadId, workerData, environmentData } = await new Promise((resolve) => {
    self.addEventListener('message', (event) => resolve(event.data), { once: true }); 
  }));
  parentPort = self;
  Object.assign(Object.getPrototypeOf(parentPort), EventEmitter.prototype);
  EventEmitter.call(parentPort);
  parentPort.addEventListener('message', (event) => parentPort.emit('message', event.data));
  parentPort.addEventListener('messageerror', (event) => parentPort.emit('messageerror', event.data));
}

export function getEnvironmentData(key) {
  return environmentData.get(key);
}

export function setEnvironmentData(key, value) {
  if (value === undefined) {
    environmentData.delete(key);
  } else {
    environmentData.set(key, value);
  }
}

export const markAsUntransferable = () => unimplemented('markAsUntransferable');
export const moveMessagePortToContext = () => unimplemented('moveMessagePortToContext');
export const receiveMessageOnPort = () => unimplemented('receiveMessageOnPort');
export const MessagePort = globalThis.MessagePort;
export const MessageChannel = globalThis.MessageChannel;
export const BroadcastChannel = globalThis.BroadcastChannel;
export const SHARE_ENV = Symbol.for('nodejs.worker_threads.SHARE_ENV');
export { parentPort, threadId, workerData }

export default {
  markAsUntransferable,
  moveMessagePortToContext,
  receiveMessageOnPort,
  MessagePort,
  MessageChannel,
  BroadcastChannel,
  Worker,
  getEnvironmentData,
  setEnvironmentData,
  SHARE_ENV,
  threadId,
  workerData,
  resourceLimits,
  parentPort,
  isMainThread,
}
