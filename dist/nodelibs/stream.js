import { e as e$1 } from './chunk-abfeab40.js';
import './chunk-00c6b2a2.js';
import { y } from './chunk-b2fb9ac7.js';
import { d as dew$6, a as dew$3, b as dew$4, c as dew, e as dew$1, f as dew$2, g as dew$5 } from './chunk-b50b117f.js';
import './chunk-9bc25606.js';
import './chunk-a7dd8f94.js';
import './chunk-d9ac4b84.js';

var t=dew$6();

var t$1=dew$3();

var t$2=dew$4();

var t$3=dew();

var t$4=dew$1();

var e=dew$2();

var o=dew$5();

var l="undefined"!==typeof globalThis?globalThis:"undefined"!==typeof self?self:global;var d={};d=Stream;var f=y.EventEmitter;var p=e$1;p(Stream,f);Stream.Readable=t;Stream.Writable=t$1;Stream.Duplex=t$2;Stream.Transform=t$3;Stream.PassThrough=t$4;Stream.finished=e;Stream.pipeline=o;Stream.Stream=Stream;function Stream(){f.call(this||l);}Stream.prototype.pipe=function(e,r){var o=this||l;function ondata(r){e.writable&&false===e.write(r)&&o.pause&&o.pause();}o.on("data",ondata);function ondrain(){o.readable&&o.resume&&o.resume();}e.on("drain",ondrain);if(!e._isStdio&&(!r||false!==r.end)){o.on("end",onend);o.on("close",onclose);}var a=false;function onend(){if(!a){a=true;e.end();}}function onclose(){if(!a){a=true;"function"===typeof e.destroy&&e.destroy();}}function onerror(e){cleanup();if(0===f.listenerCount(this||l,"error"))throw e}o.on("error",onerror);e.on("error",onerror);function cleanup(){o.removeListener("data",ondata);e.removeListener("drain",ondrain);o.removeListener("end",onend);o.removeListener("close",onclose);o.removeListener("error",onerror);e.removeListener("error",onerror);o.removeListener("end",cleanup);o.removeListener("close",cleanup);e.removeListener("close",cleanup);}o.on("end",cleanup);o.on("close",cleanup);e.on("close",cleanup);e.emit("pipe",o);return e};var u=d;

var Readable = u.Readable;
var Writable = u.Writable;
var Duplex = u.Duplex;
var Transform = u.Transform;
var PassThrough = u.PassThrough;
var finished = u.finished;
var pipeline = u.pipeline;
var Stream$1 = u.Stream;

export default u;
export { Duplex, PassThrough, Readable, Stream$1 as Stream, Transform, Writable, finished, pipeline };
