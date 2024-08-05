import { e as exports } from './chunk-gkrMq4sQ.js';
import { promisify } from './util.js';
import './events.js';
import './chunk-tHuMsdT0.js';
import './chunk-CU2hd6BF.js';
import './chunk-BZgdGiNw.js';
import './chunk-D04hy_Cu.js';
import './chunk-DEckhzyo.js';
import './chunk-b0rmRow7.js';
import './chunk-C9hMJ5VR.js';

var Readable = exports.Readable;
Readable.wrap = function(src, options) {
  options = Object.assign({ objectMode: src.readableObjectMode != null || src.objectMode != null || true }, options);
  options.destroy = function(err, callback) {
    src.destroy(err);
    callback(err);
  };
  return new Readable(options).wrap(src);
};

var Writable = exports.Writable;
var Duplex = exports.Duplex;
var Transform = exports.Transform;
var PassThrough = exports.PassThrough;
var finished = exports.finished;
var pipeline = exports.pipeline;
var Stream = exports.Stream;

const promises = {
  finished: promisify(exports.finished),
  pipeline: promisify(exports.pipeline)
};

export { Duplex, PassThrough, Readable, Stream, Transform, Writable, exports as default, finished, pipeline, promises };
