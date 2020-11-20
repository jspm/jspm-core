import { y } from './chunk-b2fb9ac7.js';

var t={};t=function(){var t=y;var e={};e.createDomain=e.create=function(){var r=new t.EventEmitter;function emitError(t){r.emit("error",t);}r.add=function(r){r.on("error",emitError);};r.remove=function(r){r.removeListener("error",emitError);};r.bind=function(r){return function(){var t=Array.prototype.slice.call(arguments);try{r.apply(null,t);}catch(r){emitError(r);}}};r.intercept=function(r){return function(t){if(t)emitError(t);else {var e=Array.prototype.slice.call(arguments,1);try{r.apply(null,e);}catch(t){emitError(t);}}}};r.run=function(r){try{r();}catch(r){emitError(r);}return this};r.dispose=function(){this.removeAllListeners();return this};r.enter=r.exit=function(){return this};return r};return e}.call(t);var e=t;

var create = e.create;
var createDomain = e.createDomain;

export default e;
export { create, createDomain };
