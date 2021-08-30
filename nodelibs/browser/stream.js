import { s as stream } from './chunk-1d5d5000.js';
export { s as default } from './chunk-1d5d5000.js';
import { promisify } from './util.js';
import './chunk-e4efb04d.js';
import './chunk-ce3d238b.js';
import './chunk-dc85b607.js';
import './chunk-ff6a5e51.js';
import './chunk-13140bc3.js';
import './chunk-0f70056b.js';
import './chunk-5752f882.js';
import './chunk-41e57db9.js';
import './chunk-2edd5477.js';

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
