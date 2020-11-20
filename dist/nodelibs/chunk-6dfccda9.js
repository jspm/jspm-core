var r={};function hasOwnProperty(r,e){return Object.prototype.hasOwnProperty.call(r,e)}r=function(r,e,t,n){e=e||"&";t=t||"=";var a={};if("string"!==typeof r||0===r.length)return a;var o=/\+/g;r=r.split(e);var s=1e3;n&&"number"===typeof n.maxKeys&&(s=n.maxKeys);var p=r.length;s>0&&p>s&&(p=s);for(var u=0;u<p;++u){var y=r[u].replace(o,"%20"),f=y.indexOf(t),i,l,v,c;if(f>=0){i=y.substr(0,f);l=y.substr(f+1);}else {i=y;l="";}v=decodeURIComponent(i);c=decodeURIComponent(l);hasOwnProperty(a,v)?Array.isArray(a[v])?a[v].push(c):a[v]=[a[v],c]:a[v]=c;}return a};var e=r;

var e$1={};var stringifyPrimitive=function(e){switch(typeof e){case"string":return e;case"boolean":return e?"true":"false";case"number":return isFinite(e)?e:"";default:return ""}};e$1=function(e,n,o,t){n=n||"&";o=o||"=";null===e&&(e=void 0);return "object"===typeof e?Object.keys(e).map((function(t){var r=encodeURIComponent(stringifyPrimitive(t))+o;return Array.isArray(e[t])?e[t].map((function(e){return r+encodeURIComponent(stringifyPrimitive(e))})).join(n):r+encodeURIComponent(stringifyPrimitive(e[t]))})).join(n):t?encodeURIComponent(stringifyPrimitive(t))+o+encodeURIComponent(stringifyPrimitive(e)):""};var n=e$1;

var r$1={};r$1.decode=r$1.parse=e;r$1.encode=r$1.stringify=n;

export { r$1 as r };
