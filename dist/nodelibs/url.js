import './chunk-00c6b2a2.js';
import { n as n$2 } from './chunk-ba900749.js';
import { r as r$2 } from './chunk-6dfccda9.js';

var e="undefined"!==typeof globalThis?globalThis:"undefined"!==typeof self?self:global;var o={};var r={exports:o};(function(n){var t=o&&!o.nodeType&&o;var i=r;var a="object"==typeof e&&e;a.global!==a&&a.window!==a&&a.self!==a||(n=a);var c,u=2147483647,d=36,f=1,s=26,l=38,p=700,v=72,h=128,g="-",w=/^xn--/,b=/[^\x20-\x7E]/,x=/[\x2E\u3002\uFF0E\uFF61]/g,C={overflow:"Overflow: input needs wider integers to process","not-basic":"Illegal input >= 0x80 (not a basic code point)","invalid-input":"Invalid input"},m=d-f,I=Math.floor,T=String.fromCharCode,A;function error(e){throw RangeError(C[e])}function map(e,o){var r=e.length;var n=[];while(r--)n[r]=o(e[r]);return n}function mapDomain(e,o){var r=e.split("@");var n="";if(r.length>1){n=r[0]+"@";e=r[1];}e=e.replace(x,".");var t=e.split(".");var i=map(t,o).join(".");return n+i}function ucs2decode(e){var o=[],r=0,n=e.length,t,i;while(r<n){t=e.charCodeAt(r++);if(t>=55296&&t<=56319&&r<n){i=e.charCodeAt(r++);if(56320==(64512&i))o.push(((1023&t)<<10)+(1023&i)+65536);else {o.push(t);r--;}}else o.push(t);}return o}function ucs2encode(e){return map(e,(function(e){var o="";if(e>65535){e-=65536;o+=T(e>>>10&1023|55296);e=56320|1023&e;}o+=T(e);return o})).join("")}function basicToDigit(e){return e-48<10?e-22:e-65<26?e-65:e-97<26?e-97:d}function digitToBasic(e,o){return e+22+75*(e<26)-((0!=o)<<5)}function adapt(e,o,r){var n=0;e=r?I(e/p):e>>1;e+=I(e/o);for(;e>m*s>>1;n+=d)e=I(e/m);return I(n+(m+1)*e/(e+l))}function decode(e){var o=[],r=e.length,n,t=0,i=h,a=v,c,l,p,w,b,x,C,m,T;c=e.lastIndexOf(g);c<0&&(c=0);for(l=0;l<c;++l){e.charCodeAt(l)>=128&&error("not-basic");o.push(e.charCodeAt(l));}for(p=c>0?c+1:0;p<r;){for(w=t,b=1,x=d;;x+=d){p>=r&&error("invalid-input");C=basicToDigit(e.charCodeAt(p++));(C>=d||C>I((u-t)/b))&&error("overflow");t+=C*b;m=x<=a?f:x>=a+s?s:x-a;if(C<m)break;T=d-m;b>I(u/T)&&error("overflow");b*=T;}n=o.length+1;a=adapt(t-w,n,0==w);I(t/n)>u-i&&error("overflow");i+=I(t/n);t%=n;o.splice(t++,0,i);}return ucs2encode(o)}function encode(e){var o,r,n,t,i,a,c,l,p,w,b,x=[],C,m,A,y;e=ucs2decode(e);C=e.length;o=h;r=0;i=v;for(a=0;a<C;++a){b=e[a];b<128&&x.push(T(b));}n=t=x.length;t&&x.push(g);while(n<C){for(c=u,a=0;a<C;++a){b=e[a];b>=o&&b<c&&(c=b);}m=n+1;c-o>I((u-r)/m)&&error("overflow");r+=(c-o)*m;o=c;for(a=0;a<C;++a){b=e[a];b<o&&++r>u&&error("overflow");if(b==o){for(l=r,p=d;;p+=d){w=p<=i?f:p>=i+s?s:p-i;if(l<w)break;y=l-w;A=d-w;x.push(T(digitToBasic(w+y%A,0)));l=I(y/A);}x.push(T(digitToBasic(l,0)));i=adapt(r,m,n==t);r=0;++n;}}++r;++o;}return x.join("")}function toUnicode(e){return mapDomain(e,(function(e){return w.test(e)?decode(e.slice(4).toLowerCase()):e}))}function toASCII(e){return mapDomain(e,(function(e){return b.test(e)?"xn--"+encode(e):e}))}c={version:"1.3.2",ucs2:{decode:ucs2decode,encode:ucs2encode},decode:decode,encode:encode,toASCII:toASCII,toUnicode:toUnicode};if(t&&i)if(r.exports==t)i.exports=c;else for(A in c)c.hasOwnProperty(A)&&(t[A]=c[A]);else n.punycode=c;})(o);var n=r.exports;

var e$1={};e$1={isString:function(t){return "string"===typeof t},isObject:function(t){return "object"===typeof t&&null!==t},isNull:function(t){return null===t},isNullOrUndefined:function(t){return null==t}};var r$1=e$1;var h={};var a=n;var o$1=r$1;h.parse=urlParse;h.resolve=urlResolve;h.resolveObject=urlResolveObject;h.format=urlFormat;h.Url=Url;function Url(){this.protocol=null;this.slashes=null;this.auth=null;this.host=null;this.port=null;this.hostname=null;this.hash=null;this.search=null;this.query=null;this.pathname=null;this.path=null;this.href=null;}var i=/^([a-z0-9.+-]+:)/i,n$1=/:[0-9]*$/,l=/^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,u=["<",">",'"',"`"," ","\r","\n","\t"],f=["{","}","|","\\","^","`"].concat(u),p=["'"].concat(f),c=["%","/","?",";","#"].concat(p),m=["/","?","#"],v=255,g=/^[+a-z0-9A-Z_-]{0,63}$/,y=/^([+a-z0-9A-Z_-]{0,63})(.*)$/,b={javascript:true,"javascript:":true},O={javascript:true,"javascript:":true},j={http:true,https:true,ftp:true,gopher:true,file:true,"http:":true,"https:":true,"ftp:":true,"gopher:":true,"file:":true},d=r$2;function urlParse(t,s,e){if(t&&o$1.isObject(t)&&t instanceof Url)return t;var r=new Url;r.parse(t,s,e);return r}Url.prototype.parse=function(t,s,e){if(!o$1.isString(t))throw new TypeError("Parameter 'url' must be a string, not "+typeof t);var r=t.indexOf("?"),h=-1!==r&&r<t.indexOf("#")?"?":"#",n=t.split(h),u=/\\/g;n[0]=n[0].replace(u,"/");t=n.join(h);var f=t;f=f.trim();if(!e&&1===t.split("#").length){var U=l.exec(f);if(U){this.path=f;this.href=f;this.pathname=U[1];if(U[2]){this.search=U[2];this.query=s?d.parse(this.search.substr(1)):this.search.substr(1);}else if(s){this.search="";this.query={};}return this}}var q=i.exec(f);if(q){q=q[0];var x=q.toLowerCase();this.protocol=x;f=f.substr(q.length);}if(e||q||f.match(/^\/\/[^@\/]+@[^@\/]+/)){var A="//"===f.substr(0,2);if(A&&!(q&&O[q])){f=f.substr(2);this.slashes=true;}}if(!O[q]&&(A||q&&!j[q])){var w=-1;for(var C=0;C<m.length;C++){var I=f.indexOf(m[C]);-1!==I&&(-1===w||I<w)&&(w=I);}var R,N;N=-1===w?f.lastIndexOf("@"):f.lastIndexOf("@",w);if(-1!==N){R=f.slice(0,N);f=f.slice(N+1);this.auth=decodeURIComponent(R);}w=-1;for(var C=0;C<c.length;C++){var I=f.indexOf(c[C]);-1!==I&&(-1===w||I<w)&&(w=I);}-1===w&&(w=f.length);this.host=f.slice(0,w);f=f.slice(w);this.parseHost();this.hostname=this.hostname||"";var P="["===this.hostname[0]&&"]"===this.hostname[this.hostname.length-1];if(!P){var k=this.hostname.split(/\./);for(var C=0,S=k.length;C<S;C++){var $=k[C];if($&&!$.match(g)){var z="";for(var F=0,H=$.length;F<H;F++)$.charCodeAt(F)>127?z+="x":z+=$[F];if(!z.match(g)){var L=k.slice(0,C);var Z=k.slice(C+1);var _=$.match(y);if(_){L.push(_[1]);Z.unshift(_[2]);}Z.length&&(f="/"+Z.join(".")+f);this.hostname=L.join(".");break}}}}this.hostname.length>v?this.hostname="":this.hostname=this.hostname.toLowerCase();P||(this.hostname=a.toASCII(this.hostname));var E=this.port?":"+this.port:"";var T=this.hostname||"";this.host=T+E;this.href+=this.host;if(P){this.hostname=this.hostname.substr(1,this.hostname.length-2);"/"!==f[0]&&(f="/"+f);}}if(!b[x])for(var C=0,S=p.length;C<S;C++){var B=p[C];if(-1!==f.indexOf(B)){var D=encodeURIComponent(B);D===B&&(D=escape(B));f=f.split(B).join(D);}}var G=f.indexOf("#");if(-1!==G){this.hash=f.substr(G);f=f.slice(0,G);}var J=f.indexOf("?");if(-1!==J){this.search=f.substr(J);this.query=f.substr(J+1);s&&(this.query=d.parse(this.query));f=f.slice(0,J);}else if(s){this.search="";this.query={};}f&&(this.pathname=f);j[x]&&this.hostname&&!this.pathname&&(this.pathname="/");if(this.pathname||this.search){var E=this.pathname||"";var K=this.search||"";this.path=E+K;}this.href=this.format();return this};function urlFormat(t){o$1.isString(t)&&(t=urlParse(t));return t instanceof Url?t.format():Url.prototype.format.call(t)}Url.prototype.format=function(){var t=this.auth||"";if(t){t=encodeURIComponent(t);t=t.replace(/%3A/i,":");t+="@";}var s=this.protocol||"",e=this.pathname||"",r=this.hash||"",h=false,a="";if(this.host)h=t+this.host;else if(this.hostname){h=t+(-1===this.hostname.indexOf(":")?this.hostname:"["+this.hostname+"]");this.port&&(h+=":"+this.port);}this.query&&o$1.isObject(this.query)&&Object.keys(this.query).length&&(a=d.stringify(this.query));var i=this.search||a&&"?"+a||"";s&&":"!==s.substr(-1)&&(s+=":");if(this.slashes||(!s||j[s])&&false!==h){h="//"+(h||"");e&&"/"!==e.charAt(0)&&(e="/"+e);}else h||(h="");r&&"#"!==r.charAt(0)&&(r="#"+r);i&&"?"!==i.charAt(0)&&(i="?"+i);e=e.replace(/[?#]/g,(function(t){return encodeURIComponent(t)}));i=i.replace("#","%23");return s+h+e+i+r};function urlResolve(t,s){return urlParse(t,false,true).resolve(s)}Url.prototype.resolve=function(t){return this.resolveObject(urlParse(t,false,true)).format()};function urlResolveObject(t,s){return t?urlParse(t,false,true).resolveObject(s):s}Url.prototype.resolveObject=function(t){if(o$1.isString(t)){var s=new Url;s.parse(t,false,true);t=s;}var e=new Url;var r=Object.keys(this);for(var h=0;h<r.length;h++){var a=r[h];e[a]=this[a];}e.hash=t.hash;if(""===t.href){e.href=e.format();return e}if(t.slashes&&!t.protocol){var i=Object.keys(t);for(var n=0;n<i.length;n++){var l=i[n];"protocol"!==l&&(e[l]=t[l]);}j[e.protocol]&&e.hostname&&!e.pathname&&(e.path=e.pathname="/");e.href=e.format();return e}if(t.protocol&&t.protocol!==e.protocol){if(!j[t.protocol]){var u=Object.keys(t);for(var f=0;f<u.length;f++){var p=u[f];e[p]=t[p];}e.href=e.format();return e}e.protocol=t.protocol;if(t.host||O[t.protocol])e.pathname=t.pathname;else {var c=(t.pathname||"").split("/");while(c.length&&!(t.host=c.shift()));t.host||(t.host="");t.hostname||(t.hostname="");""!==c[0]&&c.unshift("");c.length<2&&c.unshift("");e.pathname=c.join("/");}e.search=t.search;e.query=t.query;e.host=t.host||"";e.auth=t.auth;e.hostname=t.hostname||t.host;e.port=t.port;if(e.pathname||e.search){var m=e.pathname||"";var v=e.search||"";e.path=m+v;}e.slashes=e.slashes||t.slashes;e.href=e.format();return e}var g=e.pathname&&"/"===e.pathname.charAt(0),y=t.host||t.pathname&&"/"===t.pathname.charAt(0),b=y||g||e.host&&t.pathname,d=b,U=e.pathname&&e.pathname.split("/")||[],c=t.pathname&&t.pathname.split("/")||[],q=e.protocol&&!j[e.protocol];if(q){e.hostname="";e.port=null;e.host&&(""===U[0]?U[0]=e.host:U.unshift(e.host));e.host="";if(t.protocol){t.hostname=null;t.port=null;t.host&&(""===c[0]?c[0]=t.host:c.unshift(t.host));t.host=null;}b=b&&(""===c[0]||""===U[0]);}if(y){e.host=t.host||""===t.host?t.host:e.host;e.hostname=t.hostname||""===t.hostname?t.hostname:e.hostname;e.search=t.search;e.query=t.query;U=c;}else if(c.length){U||(U=[]);U.pop();U=U.concat(c);e.search=t.search;e.query=t.query;}else if(!o$1.isNullOrUndefined(t.search)){if(q){e.hostname=e.host=U.shift();var x=!!(e.host&&e.host.indexOf("@")>0)&&e.host.split("@");if(x){e.auth=x.shift();e.host=e.hostname=x.shift();}}e.search=t.search;e.query=t.query;o$1.isNull(e.pathname)&&o$1.isNull(e.search)||(e.path=(e.pathname?e.pathname:"")+(e.search?e.search:""));e.href=e.format();return e}if(!U.length){e.pathname=null;e.search?e.path="/"+e.search:e.path=null;e.href=e.format();return e}var A=U.slice(-1)[0];var w=(e.host||t.host||U.length>1)&&("."===A||".."===A)||""===A;var C=0;for(var I=U.length;I>=0;I--){A=U[I];if("."===A)U.splice(I,1);else if(".."===A){U.splice(I,1);C++;}else if(C){U.splice(I,1);C--;}}if(!b&&!d)for(;C--;C)U.unshift("..");!b||""===U[0]||U[0]&&"/"===U[0].charAt(0)||U.unshift("");w&&"/"!==U.join("/").substr(-1)&&U.push("");var R=""===U[0]||U[0]&&"/"===U[0].charAt(0);if(q){e.hostname=e.host=R?"":U.length?U.shift():"";var x=!!(e.host&&e.host.indexOf("@")>0)&&e.host.split("@");if(x){e.auth=x.shift();e.host=e.hostname=x.shift();}}b=b||e.host&&U.length;b&&!R&&U.unshift("");if(U.length)e.pathname=U.join("/");else {e.pathname=null;e.path=null;}o$1.isNull(e.pathname)&&o$1.isNull(e.search)||(e.path=(e.pathname?e.pathname:"")+(e.search?e.search:""));e.auth=t.auth||e.auth;e.slashes=e.slashes||t.slashes;e.href=e.format();return e};Url.prototype.parseHost=function(){var t=this.host;var s=n$1.exec(t);if(s){s=s[0];":"!==s&&(this.port=s.substr(1));t=t.substr(0,t.length-s.length);}t&&(this.hostname=t);};

// Copyright Joyent, Inc. and other Node contributors.

const processPlatform = typeof Deno !== 'undefined' ? (Deno.build.os === "windows" ? "win32" : Deno.build.os) : undefined;

h.URL = typeof URL !== 'undefined' ? URL : null;
h.pathToFileURL = pathToFileURL;
h.fileURLToPath = fileURLToPath;

var Url$1 = h.Url;
var format = h.format;
var resolve = h.resolve;
var resolveObject = h.resolveObject;

const _URL = h.URL;

const CHAR_BACKWARD_SLASH = 92;
const CHAR_FORWARD_SLASH = 47;
const CHAR_LOWERCASE_A = 97;
const CHAR_LOWERCASE_Z = 122;

const isWindows = processPlatform === 'win32';

const forwardSlashRegEx = /\//g;
const percentRegEx = /%/g;
const backslashRegEx = /\\/g;
const newlineRegEx = /\n/g;
const carriageReturnRegEx = /\r/g;
const tabRegEx = /\t/g;

/**
 * Get fully resolved platform-specific file path from the given URL string/ object
 * @param path The file URL string or URL object to convert to a path
 */
function fileURLToPath(path) {
  if (typeof path === "string") path = new URL(path);
  else if (!(path instanceof URL)) {
    throw new Deno.errors.InvalidData(
      "invalid argument path , must be a string or URL",
    );
  }
  if (path.protocol !== "file:") {
    throw new Deno.errors.InvalidData("invalid url scheme");
  }
  return isWindows ? getPathFromURLWin(path) : getPathFromURLPosix(path);
}

function getPathFromURLWin(url) {
  const hostname = url.hostname;
  let pathname = url.pathname;
  for (let n = 0; n < pathname.length; n++) {
    if (pathname[n] === "%") {
      const third = pathname.codePointAt(n + 2) || 0x20;
      if (
        (pathname[n + 1] === "2" && third === 102) || // 2f 2F /
        (pathname[n + 1] === "5" && third === 99)
      ) {
        // 5c 5C \
        throw new Deno.errors.InvalidData(
          "must not include encoded \\ or / characters",
        );
      }
    }
  }

  pathname = pathname.replace(forwardSlashRegEx, "\\");
  pathname = decodeURIComponent(pathname);
  if (hostname !== "") {
    //TODO add support for punycode encodings
    return `\\\\${hostname}${pathname}`;
  } else {
    // Otherwise, it's a local path that requires a drive letter
    const letter = pathname.codePointAt(1) | 0x20;
    const sep = pathname[2];
    if (
      letter < CHAR_LOWERCASE_A ||
      letter > CHAR_LOWERCASE_Z || // a..z A..Z
      sep !== ":"
    ) {
      throw new Deno.errors.InvalidData("file url path must be absolute");
    }
    return pathname.slice(1);
  }
}
function getPathFromURLPosix(url) {
  if (url.hostname !== "") {
    throw new Deno.errors.InvalidData("invalid file url hostname");
  }
  const pathname = url.pathname;
  for (let n = 0; n < pathname.length; n++) {
    if (pathname[n] === "%") {
      const third = pathname.codePointAt(n + 2) || 0x20;
      if (pathname[n + 1] === "2" && third === 102) {
        throw new Deno.errors.InvalidData(
          "must not include encoded / characters",
        );
      }
    }
  }
  return decodeURIComponent(pathname);
}

/** Get fully resolved platform-specific File URL from the given file path */
function pathToFileURL(filepath) {
  let resolved = n$2.resolve(filepath);
  // path.resolve strips trailing slashes so we must add them back
  const filePathLast = filepath.charCodeAt(filepath.length - 1);
  if (
    (filePathLast === CHAR_FORWARD_SLASH ||
      (isWindows && filePathLast === CHAR_BACKWARD_SLASH)) &&
    resolved[resolved.length - 1] !== n$2.sep
  ) {
    resolved += "/";
  }
  const outURL = new URL("file://");
  if (resolved.includes("%")) resolved = resolved.replace(percentRegEx, "%25");
  // In posix, "/" is a valid character in paths
  if (!isWindows && resolved.includes("\\")) {
    resolved = resolved.replace(backslashRegEx, "%5C");
  }
  if (resolved.includes("\n")) resolved = resolved.replace(newlineRegEx, "%0A");
  if (resolved.includes("\r")) {
    resolved = resolved.replace(carriageReturnRegEx, "%0D");
  }
  if (resolved.includes("\t")) resolved = resolved.replace(tabRegEx, "%09");
  outURL.pathname = resolved;
  return outURL;
}

export default h;
export { _URL as URL, Url$1 as Url, fileURLToPath, format, pathToFileURL, resolve, resolveObject };
