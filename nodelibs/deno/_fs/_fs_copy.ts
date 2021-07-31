// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.
import type { CallbackWithError } from "./_fs_common.ts";
import { fileURLToPath } from '../../nodelibs/url.js';

export function copyFile(
  source: string | URL,
  destination: string,
  callback: CallbackWithError,
): void {
  source = source instanceof URL ? fileURLToPath(source) : source;

  Deno.copyFile(source, destination)
    .then(() => callback())
    .catch(callback);
}

export function copyFileSync(source: string | URL, destination: string): void {
  source = source instanceof URL ? fileURLToPath(source) : source;
  Deno.copyFileSync(source, destination);
}
