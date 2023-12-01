const path = require('path');
const { DefinePlugin } = require('webpack');
const dotenv = require('dotenv').config({
  path: path.join(__dirname, '.env'),
});

module.exports = {
  plugins: [
    new DefinePlugin({
      'process.env': JSON.stringify(dotenv.parsed),
    }),
  ],
  entry: ['babel-polyfill', './index.ts'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              configFile: './babel.config.js',
              cacheDirectory: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader',
      },
    ],
  },
  mode: 'development',
  devServer: {
    static: path.join(__dirname, ''),
    port: 8000,
    proxy: {
      '/api/movies': {
        target: dotenv.parsed.API_CONNECT_URL,
        secure: true,
        changeOrigin: true,
        pathRewrite: {'^/api/movies': ''},
      }
    }
  },
  devtool: 'source-map',
};
