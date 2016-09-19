var webpack = require('webpack');
var pkg = require('./package.json');

module.exports = {
  entry: ['babel-polyfill', './src/index.jsx'],
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel',
        exclude: /node_modules\/(?!JSCPP)/, // we include ES6 files from JSCPP
        query: {
          plugins: ['transform-object-rest-spread'],
          presets: ['es2015', 'react']
        }
      },
      {test: /\.json$/, loader: 'json-loader'},
      {test: /\.(css)$/, loader: 'style!css'},
      {test: /\.(png|jpg|svg)$/, loader: 'url-loader?limit=8192'},
      {test: /\.(otf|eot|svg|ttf|woff|woff2).*$/, loader: 'url?limit=8192'},
      {test: /\.(txt|ino)/, loader: 'text-loader'},
    ],
    // workaround for https://github.com/webpack/webpack/issues/138
    noParse: /PEGUtil\.js$/,
  },
  output: {
    path: __dirname  + '/build',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        'APP_VERSION': JSON.stringify(pkg.version),
        'APP_NAME': JSON.stringify(pkg.name),
      }
    }),
  ]
};
