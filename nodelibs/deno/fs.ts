import { notImplemented } from 'https://deno.land/std@0.103.0/node/_utils.ts';
export * from 'https://deno.land/std@0.103.0/node/fs.ts';
import fs from 'https://deno.land/std@0.103.0/node/fs.ts';
import * as promises from './fs/promises.ts';

export { promises }

export function writev () {
  notImplemented('fs.writev');
}
// @ts-ignore
fs.writev = writev;

fs.promises = promises;

export default fs;
