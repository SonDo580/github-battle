const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./app/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/",
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, use: "babel-loader" },
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
    ],
  },
  resolve: {
    extensions: [".jsx", "..."],
  },
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  plugins: [
    new htmlWebpackPlugin({
      template: "./app/index.html",
    }),
  ],
  devServer: {
    historyApiFallback: true,
  },
};
