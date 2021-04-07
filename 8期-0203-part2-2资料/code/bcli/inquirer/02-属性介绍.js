const chalk = require('chalk')
const inquirer = require('inquirer')

const quesList = [
  {
    type: 'input',  // 指明当前问题是输入型
    name: 'userName',  // 这里的name 将来会用于从结果数据中解构我们的当前的输入值
    message: '请输入您的姓名',
    // default: chalk.gray('zoe'),
    validate(val) {
      if (!val) {
        return '当前内容为必填项'
      } else {
        return true
      }
    }
  }
]

inquirer.prompt(quesList).then((answer) => {
  console.log(answer)
  console.log(answer.userName)
})

/**
 *
 * 01 依据它指定的格式来设置问题
 * 02 将问题将给它的方法进行处理，然后获取结果
 */