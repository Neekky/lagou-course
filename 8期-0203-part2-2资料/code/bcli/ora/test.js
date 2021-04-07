// 在当前模块内演示 ora 使用
const ora = require('ora')
/**
 * 01 导包，调用函数获取对象
 * 02 对象调用 start() 开始
 * 03 耗时操作完成调用状态结束
 */
let spinner = ora('正在下载.....')
spinner.start()
setTimeout(() => {
  console.log('耗时操作完成了')
  // spinner.succeed('下载成功了')
  // spinner.info('信息')
  spinner.fail('失败')
}, 2000)
