// Some of these are not supported by all browsers (Firefox/Safari).
export const ByteLengthQueuingStrategy = globalThis.ByteLengthQueuingStrategy;
export const ReadableStreamBYOBReader = globalThis.ReadableStreamBYOBReader;
export const ReadableStreamBYOBRequest = globalThis.ReadableStreamBYOBRequest;
export const ReadableByteStreamController = globalThis.ReadableByteStreamController;
export const ReadableStreamDefaultController = globalThis.ReadableStreamDefaultController;
export const ReadableStreamDefaultReader = globalThis.ReadableStreamDefaultReader;
export const TextDecoderStream = globalThis.TextDecoderStream;
export const TextEncoderStream = globalThis.TextEncoderStream;
export const TransformStream = globalThis.TransformStream;
export const TransformStreamDefaultController = globalThis.TransformStreamDefaultController;
export const WritableStream = globalThis.WritableStream;
export const WritableStreamDefaultController = globalThis.WritableStreamDefaultController;
export const WritableStreamDefaultWriter = globalThis.WritableStreamDefaultWriter;

export { CountQueuingStrategy, ReadableStream }

export default {
  ReadableStream,
  ReadableStreamDefaultReader,
  ReadableStreamBYOBReader,
  ReadableStreamBYOBRequest,
  ReadableByteStreamController,
  ReadableStreamDefaultController,
  TransformStream,
  TransformStreamDefaultController,
  WritableStream,
  WritableStreamDefaultWriter,
  WritableStreamDefaultController,
  ByteLengthQueuingStrategy,
  CountQueuingStrategy,
  TextEncoderStream,
  TextDecoderStream,
}
