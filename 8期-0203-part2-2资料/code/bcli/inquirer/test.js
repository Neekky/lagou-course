const chalk = require('chalk')
const inquirer = require('inquirer')

const quesList = [
  {
    type: 'checkbox',  // 确认框
    name: 'feature',
    pageSize: 2,  // 一页放几个选项
    message: '选择默认安装',
    choices: ['webpack', 'vue', 'vueRouter', 'vuex', 'zce', 'NBA', 'CBA']
  }
]

inquirer.prompt(quesList).then((answer) => {
  console.log(answer)
})

/**
 *
 * 01 依据它指定的格式来设置问题
 * 02 将问题将给它的方法进行处理，然后获取结果
 *
 * a. 问题类型
 *  list input confirm checkbox
 * b. 二个钩子函数
 *  validate
 *  when()
 * c. 常见属性
 *  type
 *  name
 *  choices
 *  message
 *  default
 * d. 什么时候用
 *  项目当回来之后，生成之前，有些时候肯定要做数据渲染，这个时候就有一堆问题
 */