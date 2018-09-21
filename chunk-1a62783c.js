var exports$1 = {},
    _dewExec = false;
function dew() {
  if (_dewExec) return exports$1;
  _dewExec = true;

  if (typeof Object.create === 'function') {
    // implementation from standard node.js 'util' module
    exports$1 = function inherits(ctor, superCtor) {
      ctor.super_ = superCtor;
      ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
          value: ctor,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
    };
  } else {
    // old school shim for old browsers
    exports$1 = function inherits(ctor, superCtor) {
      ctor.super_ = superCtor;

      var TempCtor = function () {};

      TempCtor.prototype = superCtor.prototype;
      ctor.prototype = new TempCtor();
      ctor.prototype.constructor = ctor;
    };
  }

  return exports$1;
}

export { dew as a };
