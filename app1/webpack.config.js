const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const ExternalTemplateRemotesPlugin = require("external-remotes-plugin");
const deps = require('./package.json').dependencies;
const webpack = require("webpack")
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { CachedInputFileSystem, ResolverFactory } = require("enhanced-resolve")
const fs = require('fs');
const path = require("path");

const myResolver = ResolverFactory.createResolver({
  fileSystem: new CachedInputFileSystem(fs, 4000),
  conditionNames: ['node'],
  extensions: ['.js', '.json', '.node'],
  useSyncFileSystemCalls: true,
  mainFields: ['esm', 'module', 'main'],
});

module.exports = {
  entry: {
    main: "./src/index",
  },
  mode: "development",
  devServer: {
    hot: true,
    static: path.join(__dirname, "dist"),
    port: 3001,
    historyApiFallback: true,
  },
  // optimization: {
  //   runtimeChunk: 'single'
  // },
  output: {
    clean: true,
    // 保证子应用的资源路径变为绝对路径, 注意带上尾部的 '/'
    publicPath: 'http://localhost:3001/',
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json", ".jsx", ".css"],
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-typescript',
            '@babel/preset-react',
            '@babel/preset-env',
          ],
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
                './shared-utils': './src/shared-utils.ts',
              },
              typesOutputDir: '.wp_federation' // Optional, default is '.wp_federation'
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "app1",
      filename: 'remoteEntry.js',
      // remotes: {
      //   app2: "app2@http://localhost:3002/remoteEntry.js",
      //   app3: "app3@http://localhost:3003/remoteEntry.js",
      // },
      exposes: {
        './react': myResolver.resolveSync({}, process.cwd(), "react"),
        './react-dom': myResolver.resolveSync({}, process.cwd(), "react-dom"),
        './react-router-dom': myResolver.resolveSync({}, process.cwd(), "react-router-dom"),
        './shared-utils': './src/shared-utils',
        './shared-components': './src/shared-components.tsx',
        './shared-store': './src/store.ts',
      },
      // shared: {
      //   react: { singleton: true, requiredVersion: deps.react  },
      //   'react-dom': { singleton: true, requiredVersion: deps['react-dom'] }
      // }
    }),
    new ExternalTemplateRemotesPlugin( ),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      chunks: ['main']
    }),
    new ReactRefreshWebpackPlugin()
  ],
};

