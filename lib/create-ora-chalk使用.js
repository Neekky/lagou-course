const ora = require('ora')
const chalk = require('chalk')

module.exports = function (params) {
  const spinner = ora('正在下载......')
  spinner.start()
  setTimeout(() => {
    console.log(chalk.green('create操作完成了'))
    spinner.fail(chalk.red('失败'))
    spinner.succeed(chalk.greenBright('下载成功了'))
    spinner.info('信息')

    // chalk的使用
    // 背景颜色
    console.log(chalk.bgBlueBright(chalk.red('看看这是啥')))
    // 段落输出
    console.log(chalk`
            {green 疑是银河落九天}
            {red 举杯望明月}
        `)
  }, 2000)
}
