function unimplemented(functionName) {
  throw new Error(
    `Node.js performance method ${functionName} is not currently supported by JSPM core in the browser`
  );
}

const PerformanceObserver = globalThis.PerformanceObserver;
const constants = {};

const performance = {
  clearMarks: globalThis.performance.clearMarks,
  eventLoopUtilization: () => unimplemented("eventLoopUtilization"),
  mark: globalThis.performance.mark,
  measure: globalThis.performance.measure,
  nodeTiming: {},
  now: globalThis.performance.now,
  timeOrigin: globalThis.performance.timeOrigin,
  timerify: () => unimplemented("timerify"),
};

const monitorEventLoopDelay = () => unimplemented("monitorEventLoopDelay");

export default {
  performance,
  PerformanceObserver,
  monitorEventLoopDelay,
  constants,
};

export { PerformanceObserver, performance, constants, monitorEventLoopDelay };
