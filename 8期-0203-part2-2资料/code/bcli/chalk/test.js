const chalk = require('chalk')

// 01 文字颜色
console.log(chalk.red('红红火火就是我'))
console.log(chalk.green('zce是老板'))

// 02 背景颜色
console.log(chalk.bgBlueBright(chalk.red('11111')))

// 03 段落输出
console.log(chalk`
  {green 车马慢}
  {red 车跑得快}
`)