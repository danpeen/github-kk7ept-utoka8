const HtmlWebpackPlugin = require("html-webpack-plugin");
const {ModuleFederationPlugin} = require("webpack").container;
const ExternalTemplateRemotesPlugin = require("external-remotes-plugin");
const deps = require('./package.json').dependencies;

const path = require("path");

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
  output: {
    publicPath: "auto",
    // publicPath: 'http://localhost:3001',
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json", ".jsx", ".css"],
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
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "app1",
      filename: 'sharedUtil.js',
      remotes: {
        app2: "app2@[app2Url]/remoteEntry.js",
      },
      exposes: {
        './shared-utils': './src/shared-utils',
      },
      shared: {
        react: { singleton: true, requiredVersion: deps.react },
       'react-dom': { singleton: true, requiredVersion: deps['react-dom'] }
     },
    }),
    new ExternalTemplateRemotesPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};

