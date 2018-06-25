/* eslint-disable import/no-commonjs */
const path = require('path');
const UnminifiedWebpackPlugin = require('unminified-webpack-plugin');

const pluginUnminify = new UnminifiedWebpackPlugin();

const isProduction = process.env.NODE_ENV === 'production';

const productionConfig = {
  mode: 'production',
  devtool: 'source-map',
  plugins: [pluginUnminify],
};
const developmentConfig = {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [],
  watch: true,
};

const baseConfig = {
  entry: {
    talksearch: [path.resolve(__dirname, 'index.js')],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].min.js',
    library: '[name]',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        enforce: 'pre',
        use: { loader: 'babel-loader' },
      },
    ],
  },
};

const webpackConfig = {
  ...baseConfig,
  ...(isProduction ? productionConfig : developmentConfig),
};

module.exports = webpackConfig;
