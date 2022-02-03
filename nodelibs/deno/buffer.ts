export * from 'https://deno.land/std@0.125.0/node/buffer.ts';
import { default as buffer } from 'https://deno.land/std@0.125.0/node/buffer.ts';
export const kMaxLength = 4294967296;
buffer.kMaxLength = kMaxLength;
export default buffer;
