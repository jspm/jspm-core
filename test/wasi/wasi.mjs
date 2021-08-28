import fs from '../../nodelibs/browser/fs.js';
import { WASI } from '../../nodelibs/browser/wasi.js';
import { argv, env } from '../../nodelibs/browser/process.js';

const wasi = new WASI({
  args: ['cowsay', 'moo']
});
const importObject = { wasi_unstable: wasi.wasiImport };

// QUESTION:: how to ensure fs read to a URL, returns the fetched URL source?
const wasm = await WebAssembly.compile(fs.readFileSync(new URL('./cowsay.wasm', import.meta.url)));
const instance = await WebAssembly.instantiate(wasm, importObject);

wasi.start(instance);
