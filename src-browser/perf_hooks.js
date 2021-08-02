function unimplemented() {
  throw new Error(
    "Node.js performance is not supported by JSPM core in the browser"
  );
}

var performance = globalThis.performance;
var PerformanceObserver = performance.PerformanceObserver

export default {
  now: performance.now,
  clearMarks: performance.clearMarks,
  mark: performance.mark,
  nodeTime: {},
  nodeFrame: {},
  timeOrigin: performance.timeOrigin,
  eventLoopUtilization: unimplemented,
  toJSON: performance.toJSON,
  PerformanceObserver
};

export const {
  now,
  clearMarks,
  mark,
  nodeTime,
  nodeFrame,
  timeOrigin,
  eventLoopUtilization,
  toJSON,
  PerformanceObserver
}