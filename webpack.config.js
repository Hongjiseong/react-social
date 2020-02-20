const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const mode = process.env.NODE_ENV || "development";

module.exports = {
  mode,
  entry: {
    main: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  }, 
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          mode === "production"
            ? MiniCssExtractPlugin.loader
            : "style-loader",
              "css-loader",
              "sass-loader"
        ]
      },
      {
        test: /\.(png|jpe?g|svg|gif)$/,
        loader: "url-loader",
        options: {
          name: "[name].[ext]?[hash]",
          limit: 10000
        }
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
    ]
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: `Build Date : ${new Date().toLocaleString()}`
    }),
    new webpack.DefinePlugin({}),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      templateParameters: {
        env: mode === "development" ? "DEVELOPMENT" : "PRODUCTION"
      },
      minify:
        mode === "production"
          ? {
              collapseWhitespace: true,
              removeComments: true
            }
          : false,
      hash: mode === "production"
    }),
    new CleanWebpackPlugin(),
    ...(mode === "production"
      ? [new MiniCssExtractPlugin({ filename: `css/style.css` })]
      : [])
  ],
  devServer: {
    historyApiFallback: true,
    contentBase: path.join(__dirname, 'dist'),
    compress:true,
    port:3000
  }
};