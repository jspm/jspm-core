import events from 'events';
// https://github.com/denoland/deno_std/blob/d005433c709054af87aca54f57a446b4f7966f11/node/events.ts#L542
events.on = function (emitter, event) {
  const unconsumedEventValues = [];
  const unconsumedPromises = [];
  let error = null;
  let finished = false;

  const iterator = {
    async next() {
      const value = unconsumedEventValues.shift();
      if (value) {
        return createIterResult(value, false);
      }

      if (error) {
        const p = Promise.reject(error);
        error = null;
        return p;
      }

      if (finished) {
        return createIterResult(undefined, true);
      }

      return new Promise((resolve, reject) => unconsumedPromises.push({ resolve, reject }));
    },

    return() {
      emitter.removeListener(event, eventHandler);
      emitter.removeListener('error', errorHandler);
      finished = true;

      for (const promise of unconsumedPromises) {
        promise.resolve(createIterResult(undefined, true));
      }

      return Promise.resolve(createIterResult(undefined, true));
    },
    throw(err) {
      error = err;
      emitter.removeListener(event, eventHandler);
      emitter.removeListener('error', errorHandler);
    },
    [Symbol.asyncIterator]() {
      return this;
    },
  };

  emitter.on(event, eventHandler);
  emitter.on('error', errorHandler);

  return iterator;

  function eventHandler(...args) {
    const promise = unconsumedPromises.shift();
    if (promise) {
      promise.resolve(createIterResult(args, false));
    } else {
      unconsumedEventValues.push(args);
    }
  }

  function errorHandler(err) {
    finished = true;
    const toError = unconsumedPromises.shift();
    if (toError) {
      toError.reject(err);
    } else {
      error = err;
    }
    iterator.return();
  }
}
export default events;
export const {
  EventEmitter,
  defaultMaxListeners,
  init,
  listenerCount,
  on,
  once,
} = events;
