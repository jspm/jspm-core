function unimplemented () {
  throw new Error('Node.js child_process is not supported by JSPM core in the browser');
}

var child_process = {
  _forkChild: unimplemented,
  ChildProcess: unimplemented,
  exec: unimplemented,
  execFile: unimplemented,
  execFileSync: unimplemented,
  execSync: unimplemented,
  fork: unimplemented,
  spawn: unimplemented,
  spawnSync: unimplemented
};

export { unimplemented as ChildProcess, unimplemented as _forkChild, child_process as default, unimplemented as exec, unimplemented as execFile, unimplemented as execFileSync, unimplemented as execSync, unimplemented as fork, unimplemented as spawn, unimplemented as spawnSync };
