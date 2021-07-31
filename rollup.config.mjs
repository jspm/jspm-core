import rollupPluginJspm from '../../rollup-plugin-jspm/jspm-rollup.js';
import { readdirSync } from 'fs';
import rimraf from 'rimraf';

rimraf.sync('./nodelibs/browser');

const input = Object.fromEntries(
  readdirSync('./src-browser')
    .filter(n => !n.startsWith('_') && n.endsWith('.js'))
    .map(n => [n.slice(0, -3), './src-browser/' + n])
);

const jspmPlugin = rollupPluginJspm({
  env: ['browser'],
  inputMap: {
    // TODO: ensure these custom imports always override
    //       so scopes below are not needed
    imports: input,
    scopes: {
      './node_modules/https-browserify/': { http: input.http },
      './node_modules/browserify-zlib/': { stream: input.stream }
    }
  }
});

export default {
  input,
  output: {
    dir: 'nodelibs/browser',
    entryFileNames: '[name].js',
    chunkFileNames: 'chunk-[hash].js',
    format: 'esm'
  },
  onwarn () {},
  plugins: [jspmPlugin, {
    buildStart () {
      // (async () => {
      //   for await (const { type, message } of jspmPlugin.logStream()) {
      //     console.log(`${type}: ${message}`);
      //   }
      // })();
    }
  }]
}