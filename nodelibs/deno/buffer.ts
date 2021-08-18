export * from 'https://deno.land/std@0.103.0/node/buffer.ts';
import { default as buffer } from 'https://deno.land/std@0.103.0/node/buffer.ts';
export const kMaxLength = 4294967296;
declare module 'https://deno.land/std@0.103.0/node/buffer.ts' {
  export var kMaxLength: number;
}
buffer.kMaxLength = kMaxLength;
export default buffer;
