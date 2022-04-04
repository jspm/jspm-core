import type { Readable } from 'https://deno.land/std@0.133.0/node/stream.ts';
import { Buffer } from 'https://deno.land/std@0.133.0/node/buffer.ts'

// https://github.com/nodejs/node/blob/449147ebab8d91e5326b839a1ae61e45b1e73582/lib/stream/consumers.js

async function blob(stream: AsyncIterable<unknown> | ReadableStream | Readable): Promise<Blob> {
  const chunks = [];
  for await (const chunk of stream)
    chunks.push(chunk);
  return new Blob(chunks);
}

async function arrayBuffer(stream: AsyncIterable<unknown> | ReadableStream | Readable): Promise<ArrayBuffer> {
  const ret = await blob(stream);
  return ret.arrayBuffer();
}

async function buffer(stream: AsyncIterable<unknown> | ReadableStream | Readable): Promise<Buffer> {
  return Buffer.from(await arrayBuffer(stream));
}

async function text(stream: AsyncIterable<unknown> | ReadableStream | Readable): Promise<string> {
  const dec = new TextDecoder();
  let str = '';
  for await (const chunk of stream) {
    if (typeof chunk === 'string')
      str += chunk;
    else
      str += dec.decode(chunk, { stream: true });
  }
  str += dec.decode(undefined, { stream: false });
  return str;
}

export async function json(stream: AsyncIterable<unknown> | ReadableStream | Readable): Promise<unknown> {
  return JSON.parse(await text(stream));
}

export default {
  arrayBuffer,
  blob,
  buffer,
  text,
  json,
}
