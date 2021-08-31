import { s as stream } from './chunk-7b20f189.js';
export { s as default } from './chunk-7b20f189.js';
import { promisify } from './util.js';
import './events.js';
import './chunk-eb4a3827.js';
import './chunk-a75abdc7.js';
import './chunk-bf402f6f.js';
import './chunk-b196e9ea.js';
import './chunk-af36a440.js';
import './chunk-41a25566.js';
import './chunk-83f77422.js';

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
