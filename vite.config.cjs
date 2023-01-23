const path = require('path');

module.exports = {
  alias: {
    '@': path.resolve(__dirname, 'src'),
  },
  // other configs
  build: {
    command: `cpx "src/**/*" "dist/src" && cpx "public/**/*" "dist/public" && cpx "index.html" "dist" && cpx "style.css" "dist" && cpx "src/styles" "dist/styles"`,
    outDir: path.resolve(__dirname, 'dist'),
    assetsDir: '',
    publicUrl: '',
    define: {
      'process.env.NODE_ENV': process.env.NODE_ENV
    },
    rollupOptions: {},
    postcssOptions: {}
  }
};