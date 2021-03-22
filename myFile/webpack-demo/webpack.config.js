const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  mode: "none",
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'output'),
    // publicPath: 'src/img/'
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
  },
  module: {
    rules: [
      {
        test: /.js$/,
        use: [{
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }]
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
  ]
}
