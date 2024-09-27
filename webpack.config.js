const path = require('path');
const { DefinePlugin } = require('webpack');
const Dotenv = require('dotenv-webpack');
const { parsed: envVars} = require('dotenv').config();

console.log(envVars);

module.exports = {
  plugins: [
    new DefinePlugin({
      'process': JSON.stringify({}),
      'process.env': JSON.stringify(envVars)
    })
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
        target: envVars.API_CONNECT_URL, // Ensure API_CONNECT_URL is defined
        secure: true,
        changeOrigin: true,
        pathRewrite: { '^/api/movies': '' },
      },
    },
  },
  devtool: 'source-map',
};
