const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');

const isDevelopment = process.env.NODE_ENV === "development";

module.exports = {
  entry: './src/index',
  mode: 'development',
  devServer: {
    hot: true,
    static: path.join(__dirname, 'dist'),
    port: 3002,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    allowedHosts: 'all',
  },
  // 开启后能正常 HMR
  // optimization: {
  //   runtimeChunk: 'single'
  // },
  output: {
    publicPath: 'auto',
    clean: isDevelopment ? false : true,
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].js',
    // 需要配置成 umd 规范
    libraryTarget: 'umd',
    // 修改不规范的代码格式，避免逃逸沙箱
    globalObject: 'window',
    // webpack5 使用 chunkLoadingGlobal 代替，或不填保证 package.json name 唯一即可
    chunkLoadingGlobal: 'app-2',
    // 保证子应用的资源路径变为绝对路径
    // publicPath: 'http://localhost:3002',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-react'],
        },
      },
    ],
  },
  plugins: [
    // To learn more about the usage of this plugin, please visit https://webpack.js.org/plugins/module-federation-plugin/
    new ModuleFederationPlugin({
      name: 'app2',
      filename: 'remoteEntry.js',
      library: { type: 'this', name: 'app2' },
      exposes: {
        './App': './src/App',
        './button': './src/button',
      },
      shared: { react: { singleton: true }, 'react-dom': { singleton: true } },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    })
  ],
};
