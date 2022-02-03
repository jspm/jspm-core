// TODO: update this when deno_std/node will export webcrypto (when Node.js Web Crypto API is stable)
export * from 'https://deno.land/std@0.125.0/node/crypto.ts';
export const webcrypto = globalThis.crypto;
import crypto from 'https://deno.land/std@0.125.0/node/crypto.ts';
export default {
  ...crypto,
  webcrypto: globalThis.crypto,
} as typeof crypto & { webcrypto: typeof webcrypto };
