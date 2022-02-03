import { s as stream } from './chunk-c3b08ff9.js';
export { s as default } from './chunk-c3b08ff9.js';
import { promisify } from './util.js';
import './events.js';
import './chunk-4bd36a8f.js';
import './chunk-44e51b61.js';
import './chunk-ce0fbc82.js';
import './chunk-b4205b57.js';
import './chunk-5decc758.js';
import './chunk-2eac56ff.js';
import './chunk-4ccc3a29.js';

var Readable = stream.Readable;
Readable.wrap = function(src, options) {
  options = Object.assign({ objectMode: src.readableObjectMode != null || src.objectMode != null || true }, options);
  options.destroy = function(err, callback) {
    src.destroy(err);
    callback(err);
  };
  return new Readable(options).wrap(src);
};

var Writable = stream.Writable;
var Duplex = stream.Duplex;
var Transform = stream.Transform;
var PassThrough = stream.PassThrough;
var finished = stream.finished;
var pipeline = stream.pipeline;
var Stream = stream.Stream;

const promises = {
  finished: promisify(stream.finished),
  pipeline: promisify(stream.pipeline)
};

export { Duplex, PassThrough, Readable, Stream, Transform, Writable, finished, pipeline, promises };
