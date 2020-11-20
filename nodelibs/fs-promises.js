function unimplemented () {
  throw new Error('Node.js fs promises module is not supported by jspm core in the browser'));
}

var promises = {
  access: unimplemented,
  copyFile: unimplemented,
  open: unimplemented,
  opendir: unimplemented,
  rename: unimplemented,
  truncate: unimplemented,
  rmdir: unimplemented,
  mkdir: unimplemented,
  readdir: unimplemented,
  readlink: unimplemented,
  symlink: unimplemented,
  lstat: unimplemented,
  stat: unimplemented,
  link: unimplemented,
  unlink: unimplemented,
  chmod: unimplemented,
  lchmod: unimplemented,
  lchown: unimplemented,
  chown: unimplemented,
  utimes: unimplemented,
  realpath: unimplemented,
  mkdtemp: unimplemented,
  writeFile: unimplemented,
  appendFile: unimplemented,
  readFile: unimplemented
};