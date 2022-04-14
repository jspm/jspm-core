import { e as exports } from './chunk-69c21541.js';
export { e as default } from './chunk-69c21541.js';
import { promisify } from './util.js';
import './events.js';
import './chunk-8a7ab092.js';
import './chunk-538b1348.js';
import './chunk-50aa119c.js';
import './chunk-8b7cc49c.js';
import './chunk-4a97e952.js';
import './chunk-830ada85.js';
import './chunk-e7e87271.js';

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

export { Duplex, PassThrough, Readable, Stream, Transform, Writable, finished, pipeline, promises };
