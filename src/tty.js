import tty from 'browserify-tty';
export default tty;
export var ReadStream = tty.ReadStream;
export var WriteStream = tty.WriteStream;
export var isatty = tty.isatty;
