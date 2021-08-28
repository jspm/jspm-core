import memfs from 'memfs';
import memfsVolume from 'memfs/lib/volume.js';
const { Volume, createFsFromVolume } = memfs;
import { Buffer } from './buffer.js';

function unimplemented(name) {
  throw new Error(`Node.js fs ${name} is not supported by JSPM core in the browser`);
}

const vol = new Volume();

vol.StatWatcher.prototype.start = function (path, persistent, interval = 5007) {
  this.filename = memfsVolume.pathToFilename(path);
  this.setTimeout = setTimeout.bind(globalThis);
  this.interval = interval;
  this.prev = this.vol.statSync(this.filename);
  this.loop();
}

// https://github.com/wasmerio/wasmer-js/blob/55fa8c17c56348c312a8bd23c69054b1aa633891/packages/wasmfs/src/index.ts
vol.mkdirpSync('/dev', 0o777);
vol.releasedFds = [];
const files = ['stdin', 'stdout', 'stderr'];
for (let i = 0; i < 3; i++) {
  const file = files[i];
  vol.appendFileSync(`/dev/${file}`, '');
  vol.releasedFds.push(i);
  const fd = vol.openSync(`/dev/${file}`, i === 0 ? 'r' : 'w');
  if (fd !== i) throw new Error(`invalid handle for ${file}: ${fd}`);
}

// create "real" os paths
vol.mkdirSync('/usr/bin', { recursive: true });
vol.mkdirSync('/home');
vol.mkdirSync('/tmp');

watchStdo('/dev/stdout', 1, console.log);
watchStdo('/dev/stderr', 2, console.error);

function watchStdo(path, fd, listener) {
  let oldSize = 0;
  vol.watch(path, 'utf8', () => {
    const { size } = vol.statSync(path);
    const buf = Buffer.alloc(size - oldSize);
    vol.readSync(fd, buf, 0, buf.length, oldSize);
    oldSize = size;
    listener(buf.toString());
  });
}

const fs = createFsFromVolume(vol);

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
