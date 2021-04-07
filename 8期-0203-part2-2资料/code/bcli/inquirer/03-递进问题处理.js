const chalk = require('chalk')
const inquirer = require('inquirer')

const quesList = [
  {
    type: 'confirm',  // 确认框
    name: 'isInstall',
    message: '是否安装依赖'
  },
  {
    type: 'list',  // 单选框
    name: 'method',
    message: '请选择您的下载工具',
    choices: ['npm', 'cnpm', 'yarn'],
    when(a) {
      if (a.isInstall) {
        return true
      } else {
        return false
      }
    }
  }
]

inquirer.prompt(quesList).then((answer) => {
  console.log(answer)
})

/**
 *
 * 01 依据它指定的格式来设置问题
 * 02 将问题将给它的方法进行处理，然后获取结果
 */