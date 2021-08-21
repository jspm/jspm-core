/// <reference lib="webworker"/>

import { EventEmitter } from 'https://deno.land/std@0.105.0/node/events.ts';

function unimplemented(name: string) {
  throw new Error(
    `Node.js worker_threads ${name} is not currently supported by JSPM core in Deno`,
  );
}

const environmentData = new Map();
let threads = 0;

interface _WorkerOptions extends WorkerOptions {
  workerData?: any;
  resourceLimits?: {
    maxYoungGenerationSizeMb?: number;
    maxOldGenerationSizeMb?: number;
    codeRangeSizeMb?: number;
    stackSizeMb?: number;
  };
}
interface _Worker extends Worker, EventEmitter {}
class _Worker extends Worker {
  public threadId: number;
  public resourceLimits: Required<NonNullable<_WorkerOptions['resourceLimits']>>; 

  constructor(specifier: URL | string, options?: _WorkerOptions) {
    if (options == null) options = { type: 'module' };
    else if (typeof options === 'object') options.type = 'module';
    super(specifier, options);
    this.addEventListener('error', (event) => this.emit('error', event.error || event.message));
    this.addEventListener('messageerror', (event) => this.emit('messageerror', event.data));
    this.addEventListener('message', (event) => this.emit('message', event.data));
    this.postMessage({
      environmentData,
      threadId: (this.threadId = ++threads),
      workerData: options.workerData,
    });
    this.resourceLimits = {
      maxYoungGenerationSizeMb: -1,
      maxOldGenerationSizeMb: -1,
      codeRangeSizeMb: -1,
      stackSizeMb: 4,
    };
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
let parentPort: (WorkerGlobalScope & typeof globalThis & EventEmitter) | null = null;

if (!isMainThread) {
  ({ threadId, workerData, environmentData } = await new Promise((resolve) =>
    self.addEventListener('message', (event: MessageEvent) => resolve(event.data), {
      once: true,
    }),
  ));
  parentPort = self as WorkerGlobalScope & typeof globalThis & EventEmitter;
  Object.assign(Object.getPrototypeOf(parentPort), EventEmitter.prototype);
  parentPort.addEventListener('message', (event: MessageEvent) => parentPort!.emit('message', event.data));
  parentPort.addEventListener('messageerror', (event: MessageEvent) => parentPort!.emit('messageerror', event.data));
}

export function getEnvironmentData(key: any) {
  return environmentData.get(key);
}

export function setEnvironmentData(key: any, value: any) {
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
export {
  _Worker as Worker,
  parentPort,
  threadId,
  workerData,
}

export default {
  markAsUntransferable,
  moveMessagePortToContext,
  receiveMessageOnPort,
  MessagePort,
  MessageChannel,
  BroadcastChannel,
  Worker: _Worker,
  getEnvironmentData,
  setEnvironmentData,
  SHARE_ENV,
  threadId,
  workerData,
  resourceLimits,
  parentPort,
  isMainThread,
}
