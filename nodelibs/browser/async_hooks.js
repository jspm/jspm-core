function unimplemented () {
  throw new Error('Node.js async_hooks module is not supported by JSPM core outside of Node.js');
}

var async_hooks = {
  AsyncLocalStorage: unimplemented,
  createHook: unimplemented,
  executionAsyncId: unimplemented,
  triggerAsyncId: unimplemented,
  executionAsyncResource: unimplemented,
  AsyncResource: unimplemented
};

export default async_hooks;
export { unimplemented as AsyncLocalStorage, unimplemented as AsyncResource, unimplemented as createHook, unimplemented as executionAsyncId, unimplemented as executionAsyncResource, unimplemented as triggerAsyncId };
