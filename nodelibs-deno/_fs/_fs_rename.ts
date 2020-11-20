import { fileURLToPath } from '../../nodelibs/url.js';

export function rename(
  oldPath: string | URL,
  newPath: string | URL,
  callback: (err?: Error) => void,
) {
  oldPath = oldPath instanceof URL ? fileURLToPath(oldPath) : oldPath;
  newPath = newPath instanceof URL ? fileURLToPath(newPath) : newPath;

  if (!callback) throw new Error("No callback function supplied");

  Deno.rename(oldPath, newPath)
    .then((_) => callback())
    .catch(callback);
}

export function renameSync(oldPath: string | URL, newPath: string | URL) {
  oldPath = oldPath instanceof URL ? fileURLToPath(oldPath) : oldPath;
  newPath = newPath instanceof URL ? fileURLToPath(newPath) : newPath;

  Deno.renameSync(oldPath, newPath);
}
