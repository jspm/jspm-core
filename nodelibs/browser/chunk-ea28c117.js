function unimplemented () {
  throw new Error('Node.js fs promises module is not supported by JSPM core in the browser');
}

var fsPromises = {
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

var promises = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': fsPromises,
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
});

export { fsPromises as f, promises as p, unimplemented as u };
