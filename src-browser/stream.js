import stream from 'stream-browserify';
import { promisify } from './util.js';
export default stream;

export var Readable = stream.Readable;
export var Writable = stream.Writable;
export var Duplex = stream.Duplex;
export var Transform = stream.Transform;
export var PassThrough = stream.PassThrough;
export var finished = stream.finished;
export var pipeline = stream.pipeline;
export var Stream = stream.Stream;

export const promises = {
  finished: promisify(stream.finished),
  pipeline: promisify(stream.pipeline)
};
