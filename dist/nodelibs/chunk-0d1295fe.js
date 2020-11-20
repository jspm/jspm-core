import './chunk-00c6b2a2.js';
import { y as y$1 } from './chunk-b2fb9ac7.js';
import './chunk-9bc25606.js';
import { d } from './chunk-a7dd8f94.js';
import { P as Pe, l as lt, d as dt, y as yt, v as vt, x as xe, a as v$2 } from './chunk-dd5a9712.js';

var b,h="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:global;b=p;var L=y$1.EventEmitter;function p(){L.call(this||h);}d(p,L),p.Readable=Pe,p.Writable=lt,p.Duplex=dt,p.Transform=yt,p.PassThrough=vt,p.finished=xe,p.pipeline=v$2,p.Stream=p,p.prototype.pipe=function(e,r){var n=this||h;function o(r){e.writable&&!1===e.write(r)&&n.pause&&n.pause();}function i(){n.readable&&n.resume&&n.resume();}n.on("data",o),e.on("drain",i),e._isStdio||r&&!1===r.end||(n.on("end",a),n.on("close",s));var t=!1;function a(){t||(t=!0,e.end());}function s(){t||(t=!0,"function"==typeof e.destroy&&e.destroy());}function m(e){if(l(),0===L.listenerCount(this||h,"error"))throw e}function l(){n.removeListener("data",o),e.removeListener("drain",i),n.removeListener("end",a),n.removeListener("close",s),n.removeListener("error",m),e.removeListener("error",m),n.removeListener("end",l),n.removeListener("close",l),e.removeListener("close",l);}return n.on("error",m),e.on("error",m),n.on("end",l),n.on("close",l),e.on("close",l),e.emit("pipe",n),e};var j=b;var y=j.Readable;var T=j.Writable;var g=j.Duplex;var _=j.Transform;var x=j.PassThrough;var w=j.finished;var S=j.pipeline;var D=j.Stream;

export { j };
