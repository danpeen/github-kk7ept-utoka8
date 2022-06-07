const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');
const webpack = require("webpack")
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const isDevelopment = process.env.NODE_ENV === "development";

module.exports = {
  entry: {
    main: "./src/index",
  },
  mode: 'development',
  devServer: {
    hot: true,
    static: path.join(__dirname, 'dist'),
    port: 3003,
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    allowedHosts: 'all',
  },
  // 开启后能正常 HMR
  // optimization: {
  //   runtimeChunk: 'single'
  // },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json", ".jsx", ".css"],
  },
  output: {
    // publicPath: 'auto',
    clean: isDevelopment ? false : true,
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].js',
    // 需要配置成 umd 规范
    libraryTarget: 'umd',
    // 修改不规范的代码格式，避免逃逸沙箱
    globalObject: 'window',
    // webpack5 使用 chunkLoadingGlobal 代替，或不填保证 package.json name 唯一即可
    chunkLoadingGlobal: 'app-3',
    // 保证子应用的资源路径变为绝对路径, 注意带上尾部的 '/'
    publicPath: 'http://localhost:3003/',
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-react"],
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.less$/i,
        use: [
          "style-loader",
          "css-loader",
          "less-loader",
        ],
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'dts-loader',
            options: {
              name: 'app', // The name configured in ModuleFederationPlugin
              exposes: { // The exposes configured in ModuleFederationPlugin
                './shared-button': './src/button.tsx',
              },
              typesOutputDir: '.wp_federation' // Optional, default is '.wp_federation'
            },
          },
        ],
      },
    ],
  },
  plugins: [
    // To learn more about the usage of this plugin, please visit https://webpack.js.org/plugins/module-federation-plugin/
    new ModuleFederationPlugin({
      name: 'app3',
      filename: 'remoteEntry.js',
      remotes: {
        app1: "app1@http://localhost:3001/sharedUtil.js",
      },
      exposes: {
        './shared-button': './src/button.tsx',
      },
      shared: { react: { singleton: true }, 'react-dom': { singleton: true }},
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new ReactRefreshWebpackPlugin(),

    // 只是拿 react 举个例子，第二个回调函数参数应该由用户传来的配置进行封装
    new webpack.NormalModuleReplacementPlugin(/(.*)/, ((resource) => {
      // 如果请求的 resource 是 react，则指向 app1/react
      if (resource.request === 'react') {
        resource.request = 'app1/react';
      }
      if (resource.request === 'react-dom') {
        resource.request = 'app1/react-dom';
      }
      if (resource.request === 'react-router-dom') {
        resource.request = 'app1/react-router-dom';
      }
    }))
  ],
};
