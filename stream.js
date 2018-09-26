import { b as dew, c as dew$1, d as dew$2 } from './chunk-fddb501f.js';
import _events from './events.js';
import { a as dew$3 } from './chunk-1a62783c.js';
import './process.js';
import './buffer.js';
import './string_decoder-a0532e16.js';

var exports$1 = {},
    _dewExec = false;
function dew$4() {
  if (_dewExec) return exports$1;
  _dewExec = true;
  exports$1 = dew();
  return exports$1;
}

var exports$2 = {},
    _dewExec$1 = false;
function dew$5() {
  if (_dewExec$1) return exports$2;
  _dewExec$1 = true;
  exports$2 = dew$1();
  return exports$2;
}

var exports$3 = {},
    _dewExec$2 = false;
function dew$6() {
  if (_dewExec$2) return exports$3;
  _dewExec$2 = true;
  exports$3 = dew$2().Transform;
  return exports$3;
}

var exports$4 = {},
    _dewExec$3 = false;
function dew$7() {
  if (_dewExec$3) return exports$4;
  _dewExec$3 = true;
  exports$4 = dew$2().PassThrough;
  return exports$4;
}

var exports$5 = {},
    _dewExec$4 = false;

var _global = typeof self !== "undefined" ? self : global;

function dew$8() {
  if (_dewExec$4) return exports$5;
  _dewExec$4 = true;
  // Copyright Joyent, Inc. and other Node contributors.
  //
  // Permission is hereby granted, free of charge, to any person obtaining a
  // copy of this software and associated documentation files (the
  // "Software"), to deal in the Software without restriction, including
  // without limitation the rights to use, copy, modify, merge, publish,
  // distribute, sublicense, and/or sell copies of the Software, and to permit
  // persons to whom the Software is furnished to do so, subject to the
  // following conditions:
  //
  // The above copyright notice and this permission notice shall be included
  // in all copies or substantial portions of the Software.
  //
  // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
  // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
  // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
  // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
  // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
  // USE OR OTHER DEALINGS IN THE SOFTWARE.
  exports$5 = Stream;
  var EE = _events.EventEmitter;

  var inherits = dew$3();

  inherits(Stream, EE);
  Stream.Readable = dew$2();
  Stream.Writable = dew$4();
  Stream.Duplex = dew$5();
  Stream.Transform = dew$6();
  Stream.PassThrough = dew$7(); // Backwards-compat with node 0.4.x

  Stream.Stream = Stream; // old-style streams.  Note that the pipe method (the only relevant
  // part of this class) is overridden in the Readable class.

  function Stream() {
    EE.call(this || _global);
  }

  Stream.prototype.pipe = function (dest, options) {
    var source = this || _global;

    function ondata(chunk) {
      if (dest.writable) {
        if (false === dest.write(chunk) && source.pause) {
          source.pause();
        }
      }
    }

    source.on('data', ondata);

    function ondrain() {
      if (source.readable && source.resume) {
        source.resume();
      }
    }

    dest.on('drain', ondrain); // If the 'end' option is not supplied, dest.end() will be called when
    // source gets the 'end' or 'close' events.  Only dest.end() once.

    if (!dest._isStdio && (!options || options.end !== false)) {
      source.on('end', onend);
      source.on('close', onclose);
    }

    var didOnEnd = false;

    function onend() {
      if (didOnEnd) return;
      didOnEnd = true;
      dest.end();
    }

    function onclose() {
      if (didOnEnd) return;
      didOnEnd = true;
      if (typeof dest.destroy === 'function') dest.destroy();
    } // don't leave dangling pipes when there are errors.


    function onerror(er) {
      cleanup();

      if (EE.listenerCount(this || _global, 'error') === 0) {
        throw er; // Unhandled stream error in pipe.
      }
    }

    source.on('error', onerror);
    dest.on('error', onerror); // remove all the event listeners that were added.

    function cleanup() {
      source.removeListener('data', ondata);
      dest.removeListener('drain', ondrain);
      source.removeListener('end', onend);
      source.removeListener('close', onclose);
      source.removeListener('error', onerror);
      dest.removeListener('error', onerror);
      source.removeListener('end', cleanup);
      source.removeListener('close', cleanup);
      dest.removeListener('close', cleanup);
    }

    source.on('end', cleanup);
    source.on('close', cleanup);
    dest.on('close', cleanup);
    dest.emit('pipe', source); // Allow for unix-like usage: A.pipe(B).pipe(C)

    return dest;
  };

  return exports$5;
}

const exports$6 = dew$8();
const Duplex = exports$6.Duplex, PassThrough = exports$6.PassThrough, Readable = exports$6.Readable, Stream = exports$6.Stream, Transform = exports$6.Transform, Writable = exports$6.Writable, super_ = exports$6.super_;

export default exports$6;
export { Duplex, PassThrough, Readable, Stream, Transform, Writable, super_ };
