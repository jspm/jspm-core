import events from 'browserify-events';
export default events;
export var EventEmitter = events.EventEmitter;
export var defaultMaxListeners = events.defaultMaxListeners;
export var init = events.init;
export var listenerCount = events.listenerCount;
