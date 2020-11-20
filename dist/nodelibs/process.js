var e="undefined"!==typeof globalThis?globalThis:"undefined"!==typeof self?self:global;var t={};var n=t={};var r;var o;function defaultSetTimout(){throw new Error("setTimeout has not been defined")}function defaultClearTimeout(){throw new Error("clearTimeout has not been defined")}(function(){try{r="function"===typeof setTimeout?setTimeout:defaultSetTimout;}catch(e){r=defaultSetTimout;}try{o="function"===typeof clearTimeout?clearTimeout:defaultClearTimeout;}catch(e){o=defaultClearTimeout;}})();function runTimeout(t){if(r===setTimeout)return setTimeout(t,0);if((r===defaultSetTimout||!r)&&setTimeout){r=setTimeout;return setTimeout(t,0)}try{return r(t,0)}catch(n){try{return r.call(null,t,0)}catch(n){return r.call(this||e,t,0)}}}function runClearTimeout(t){if(o===clearTimeout)return clearTimeout(t);if((o===defaultClearTimeout||!o)&&clearTimeout){o=clearTimeout;return clearTimeout(t)}try{return o(t)}catch(n){try{return o.call(null,t)}catch(n){return o.call(this||e,t)}}}var u=[];var i=false;var a;var l=-1;function cleanUpNextTick(){if(i&&a){i=false;a.length?u=a.concat(u):l=-1;u.length&&drainQueue();}}function drainQueue(){if(!i){var e=runTimeout(cleanUpNextTick);i=true;var t=u.length;while(t){a=u;u=[];while(++l<t)a&&a[l].run();l=-1;t=u.length;}a=null;i=false;runClearTimeout(e);}}n.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];u.push(new Item(e,t));1!==u.length||i||runTimeout(drainQueue);};function Item(t,n){(this||e).fun=t;(this||e).array=n;}Item.prototype.run=function(){(this||e).fun.apply(null,(this||e).array);};n.title="browser";n.browser=true;n.env={};n.argv=[];n.version="";n.versions={};function noop(){}n.on=noop;n.addListener=noop;n.once=noop;n.off=noop;n.removeListener=noop;n.removeAllListeners=noop;n.emit=noop;n.prependListener=noop;n.prependOnceListener=noop;n.listeners=function(e){return []};n.binding=function(e){throw new Error("process.binding is not supported")};n.cwd=function(){return "/"};n.chdir=function(e){throw new Error("process.chdir is not supported")};n.umask=function(){return 0};var c=t;

var addListener = c.addListener;
var argv = c.argv;
var binding = c.binding;
var browser = c.browser;
var chdir = c.chdir;
var cwd = c.cwd;
var emit = c.emit;
var env = c.env;
var listeners = c.listeners;
var nextTick = c.nextTick;
var off = c.off;
var on = c.on;
var once = c.once;
var prependListener = c.prependListener;
var prependOnceListener = c.prependOnceListener;
var removeAllListeners = c.removeAllListeners;
var removeListener = c.removeListener;
var title = c.title;
var umask = c.umask;
var version = c.version;
var versions = c.versions;

export default c;
export { addListener, argv, binding, browser, chdir, cwd, emit, env, listeners, nextTick, off, on, once, prependListener, prependOnceListener, removeAllListeners, removeListener, title, umask, version, versions };
