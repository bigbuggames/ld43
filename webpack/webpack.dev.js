const webpack = require("webpack");
const path = require("path");
const merge = require("webpack-merge");

const HtmlWebpackPlugin = require("html-webpack-plugin");

const config = require("../package.json");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  entry: ["webpack-hot-middleware/client"],
  devtool: "cheap-eval-source-map",
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: config.name,
      template: path.resolve(__dirname, "../public/index.dev.html")
    })
  ]
});
