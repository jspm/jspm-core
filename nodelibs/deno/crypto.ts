export * from 'https://deno.land/std@0.103.0/node/crypto.ts';
export const webcrypto = globalThis.crypto;
import crypto from 'https://deno.land/std@0.103.0/node/crypto.ts';
export default {
  ...crypto,
  webcrypto: globalThis.crypto,
} as typeof crypto & { webcrypto: typeof webcrypto };
