import { notImplemented } from 'https://deno.land/std@0.103.0/node/_utils.ts';
export * from 'https://deno.land/std@0.103.0/node/fs.ts';
import fs from 'https://deno.land/std@0.103.0/node/fs.ts';

export function writev () {
  notImplemented('fs.writev');
}
fs.writev = writev;

export default fs;
