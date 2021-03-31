const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack');

module.exports = {
  mode: "none",
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'output'),
    // publicPath: 'src/img/'
  },
  devServer: {
    // hot: true,
    hotOnly: true,
    contentBase: path.join(__dirname, 'output'),
    compress: true,
    port: 9000,
    proxy: {
      '/api': {
        target: "https://api.github.com",
        pathRewrite: {
          '^/api': ''
        },
        changeOrigin: true
      }
    }
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: "defaults" }]
            ]
          }
        }
      },
      {
        test: /.css$/,
        use: ['style-loader', "css-loader"]
      },
      {
        test: /.png$/,
        use: ['url-loader']
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin(),
    // new CopyWebpackPlugin()
    new webpack.HotModuleReplacementPlugin()
  ]
}
