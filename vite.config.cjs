const path = require('path');
const minify = require('rollup-plugin-minify-es');

module.exports = {
   alias: {
      '@': path.resolve(__dirname, 'src'),
   },
   build: {
      outDir: path.resolve(__dirname, 'dist'),
      assetsDir: '',
      publicUrl: '',
      define: {
         'process.env.NODE_ENV': process.env.NODE_ENV
      },
      rollupOptions: {
         input: 'index.js',
         output: {
            dir: 'dist',
            format: 'cjs',
            entryFileNames: '[name].js',
         },
         plugins: [minify()]
      },
      postcssOptions: {
         plugins: {
            'postcss-preset-env': {
               features: {
                  'nesting-rules': true
               },
               importFrom: 'src/styles/variables.css',
               output: 'dist/index.css',
               minify: true
            }
         }
      },
      command: `cpx "src/**/*" "dist/src" && cpx "public/**/*" "dist/public" && cpx "index.html" "dist" && cpx "style.css" "dist" && cpx "src/styles" "dist/styles"`
   }
};
