import { e as exports } from './chunk-bae46e69.js';
export { e as default } from './chunk-bae46e69.js';
import { promisify } from './util.js';
import './events.js';
import './chunk-001ff647.js';
import './chunk-c1749ca1.js';
import './chunk-739d4e67.js';
import './chunk-566596b9.js';
import './chunk-32df7659.js';
import './chunk-6ad9b8b8.js';
import './chunk-605e2a90.js';

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
