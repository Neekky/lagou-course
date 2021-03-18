const path = require('path')

module.exports = {
  mode: "none",
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'output'),
    // publicPath: 'src/img/'
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
  }
}
