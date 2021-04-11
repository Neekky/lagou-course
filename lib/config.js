const inquirer = require('inquirer');
const chalk = require('chalk');

const quesList = [
  {
    type: "input",
    name: "userName",
    message: "请输入您的姓名",
    default: chalk.grey("zcc"),
  },
  {
    type: "input",
    name: "userPhone",
    message: "请输入您的电话号码",
    validate(val) {
        if(!val){
            return '此处为必填'
        } else {
            return true
        }
    }
  },
  {
    type: "checkbox",
    name: "userConfig",
    message: "请选择您的配置",
    pageSize: 3, // 一页展示几项
    choices: ['react', 'vue', 'webpack', 'gulp', 'vuex', 'redux', 'mobx']
  },
  {
      type: "confirm",
      name: "isInstall",
      message: "是否按照依赖"
  },
  {
      type: "list",
      name: "methods",
      message: "请选择下载工具",
      choices: ["npm", "cnpm", "yarn"],
      when(is) {
        if(is.isInstall) {
            return true;
        } else {
            return false;
        }
      }
  },
]

module.exports = function () {
  inquirer.prompt(quesList).then((answer) => {
    console.log(answer);
  })
}