var e={};e.endianness=function(){return "LE"};e.hostname=function(){return "undefined"!==typeof location?location.hostname:""};e.loadavg=function(){return []};e.uptime=function(){return 0};e.freemem=function(){return Number.MAX_VALUE};e.totalmem=function(){return Number.MAX_VALUE};e.cpus=function(){return []};e.type=function(){return "Browser"};e.release=function(){return "undefined"!==typeof navigator?navigator.appVersion:""};e.networkInterfaces=e.getNetworkInterfaces=function(){return {}};e.arch=function(){return "javascript"};e.platform=function(){return "browser"};e.tmpdir=e.tmpDir=function(){return "/tmp"};e.EOL="\n";e.homedir=function(){return "/"};

var EOL = e.EOL;
var arch = e.arch;
var cpus = e.cpus;
var endianness = e.endianness;
var freemem = e.freemem;
var getNetworkInterfaces = e.getNetworkInterfaces;
var homedir = e.homedir;
var hostname = e.hostname;
var loadavg = e.loadavg;
var networkInterfaces = e.networkInterfaces;
var platform = e.platform;
var release = e.release;
var tmpDir = e.tmpDir;
var tmpdir = e.tmpdir;
var totalmem = e.totalmem;
var type = e.type;
var uptime = e.uptime;

export default e;
export { EOL, arch, cpus, endianness, freemem, getNetworkInterfaces, homedir, hostname, loadavg, networkInterfaces, platform, release, tmpDir, tmpdir, totalmem, type, uptime };
