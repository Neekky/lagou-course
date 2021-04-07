module.exports = function (aName, params) {
  // 依据命令将操作分发至不同的模块
  require('./' + aName + '.js')(params)
}