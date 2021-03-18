const path = require('path')

module.exports = {
  mode: "development",
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'output')
  },
  module: {
    rules: [
      {
        test: /.css$/,
        use: ['style-loader',"css-loader"]
      }
    ]
  }
}
