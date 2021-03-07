var sqwish = require("sqwish");
var Stream = require("stream");

module.exports = function () {

  var stream = new Stream.Transform({ objectMode: true })
  stream._transform = function (file, encoding, callback) {
    var content = file.contents.toString()
    file.contents = Buffer.from(sqwish.minify(content, true))
    callback(null, file)
  }
  return stream
}