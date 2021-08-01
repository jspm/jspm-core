function unimplemented () {
  throw new Error('Node.js fs promises module is not supported by JSPM core in the browser');
}

export default {
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

export {
  unimplemented as access,
  unimplemented as copyFile,
  unimplemented as open,
  unimplemented as opendir,
  unimplemented as rename,
  unimplemented as truncate,
  unimplemented as rmdir,
  unimplemented as mkdir,
  unimplemented as readdir,
  unimplemented as readlink,
  unimplemented as symlink,
  unimplemented as lstat,
  unimplemented as stat,
  unimplemented as link,
  unimplemented as unlink,
  unimplemented as chmod,
  unimplemented as lchmod,
  unimplemented as lchown,
  unimplemented as chown,
  unimplemented as utimes,
  unimplemented as realpath,
  unimplemented as mkdtemp,
  unimplemented as writeFile,
  unimplemented as appendFile,
  unimplemented as readFile
}
