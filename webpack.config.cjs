const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src', to: 'src' },
        { from: 'public', to: 'public' },
        { from: 'index.html', to: '.' },
        { from: 'style.css', to: '.' },
        { from: 'src/styles', to: 'styles' },
      ],
    }),
  ],
};