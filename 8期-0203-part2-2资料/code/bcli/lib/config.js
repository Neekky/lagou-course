const inquirer = require('inquirer');

const quesList = [
  {
    type: "input",
    name: "userName",
    message: "请输入您的姓名"
  }
]

module.exports = function () {
  inquirer.prompt(quesList).then((answer) => {
    console.log(answer);
  })
}