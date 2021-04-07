module.exports = function (actName, params) {
  // 当前的 index.js 只是一个入口文件，它接收到了由 cli.js 传递过来的参数
  // 此时我们应该将参数们再次分发给不同的模块进行使用
  require('./' + actName + '.js')(params)
}