import memfs from 'memfs';
import volume from 'memfs/lib/volume.js';
const { vol, createFsFromVolume } = memfs;
import { Buffer } from './buffer.js';

function unimplemented(name) {
  throw new Error(`Node.js fs ${name} is not supported by JSPM core in the browser`);
}

vol.fromNestedJSON({
  '/dev': { stdin: '', stdout: '', stderr: '' },
  '/usr/bin': {},
  '/home': {},
  '/tmp': {},
});

vol.releasedFds = [2, 1, 0];
vol.openSync('/dev/stdin', 'w');
vol.openSync('/dev/stdout', 'r');
vol.openSync('/dev/stderr', 'r');
watchStdo('/dev/stdout', 1, console.log);
watchStdo('/dev/stderr', 2, console.error);
function watchStdo(path, fd, listener) {
  let oldSize = 0;
  const decoder = new TextDecoder();
  vol.watch(path, 'utf8', () => {
    const { size } = vol.fstatSync(fd);
    const buf = Buffer.alloc(size - oldSize);
    vol.readSync(fd, buf, 0, buf.length, oldSize);
    oldSize = size;
    listener(decoder.decode(buf, { stream: true }));
  });
}

const fs = createFsFromVolume(vol);

fs.opendir = () => unimplemented('opendir');
fs.opendirSync = () => unimplemented('opendirSync');
fs.promises.opendir = () => unimplemented('promises.opendir');
fs.cp = () => unimplemented('cp');
fs.cpSync = () => unimplemented('cpSync');
fs.promises.cp = () => unimplemented('promises.cp');
fs.readv = () => unimplemented('readv');
fs.readvSync = () => unimplemented('readvSync');
fs.rm = () => unimplemented('rm');
fs.rmSync = () => unimplemented('rmSync');
fs.promises.rm = () => unimplemented('promises.rm');
fs.Dir = () => unimplemented('Dir');
fs.promises.watch = () => unimplemented('promises.watch');

// TODO: remove this when https://github.com/streamich/memfs/pull/732 is merged and memfs released
fs.StatWatcher.prototype.start = function (path, persistent, interval = 5007) {
  this.filename = volume.pathToFilename(path);
  this.setTimeout = setTimeout.bind(self);
  this.interval = interval;
  this.prev = this.fs.statSync(this.filename);
  this.loop();
}

fs.FileReadStream = fs.ReadStream;
fs.FileWriteStream = fs.WriteStream;

export const {
  appendFile,
  appendFileSync,
  access,
  accessSync,
  chown,
  chownSync,
  chmod,
  chmodSync,
  close,
  closeSync,
  copyFile,
  copyFileSync,
  cp,
  cpSync,
  createReadStream,
  createWriteStream,
  exists,
  existsSync,
  fchown,
  fchownSync,
  fchmod,
  fchmodSync,
  fdatasync,
  fdatasyncSync,
  fstat,
  fstatSync,
  fsync,
  fsyncSync,
  ftruncate,
  ftruncateSync,
  futimes,
  futimesSync,
  lchown,
  lchownSync,
  lchmod,
  lchmodSync,
  link,
  linkSync,
  lstat,
  lstatSync,
  mkdir,
  mkdirSync,
  mkdtemp,
  mkdtempSync,
  open,
  openSync,
  opendir,
  opendirSync,
  readdir,
  readdirSync,
  read,
  readSync,
  readv,
  readvSync,
  readFile,
  readFileSync,
  readlink,
  readlinkSync,
  realpath,
  realpathSync,
  rename,
  renameSync,
  rm,
  rmSync,
  rmdir,
  rmdirSync,
  stat,
  statSync,
  symlink,
  symlinkSync,
  truncate,
  truncateSync,
  unwatchFile,
  unlink,
  unlinkSync,
  utimes,
  utimesSync,
  watch,
  watchFile,
  writeFile,
  writeFileSync,
  write,
  writeSync,
  writev,
  writevSync,
  Dir,
  Dirent,
  Stats,
  ReadStream,
  WriteStream,
  FileReadStream,
  FileWriteStream,
  _toUnixTimestamp,
  constants: { F_OK, R_OK, W_OK, X_OK },
  constants,
  promises,
} = fs;

export default fs;
