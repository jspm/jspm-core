function unimplemented() {
  throw new Error(
    "Node.js performance is not supported by JSPM core in the browser"
  );
}

const PerformanceObserver = globalThis.PerformanceObserver;
const constants = {};

const performance = {
  clearMarks: globalThis.performance.clearMarks,
  eventLoopUtilization: unimplemented,
  mark: globalThis.performance.mark,
  measure: globalThis.performance.measure,
  nodeTiming: {},
  now: globalThis.performance.now,
  nodeFrame: {},
  timeOrigin: globalThis.performance.timeOrigin,
  timerify: unimplemented,
};

const monitorEventLoopDelay = unimplemented;

export default {
  performance,
  PerformanceObserver,
  monitorEventLoopDelay,
  constants,
};

export { PerformanceObserver, performance, constants, monitorEventLoopDelay };
