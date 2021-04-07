#! /usr/bin/env node
const { program } = require('commander')

// 我们的工具包将来可能会存在多个命令，此时应该想法让程序来直接生成，不应该一个一个写
// 01 自定义一个数据结构来存放多条命令的信息
const actionsMap = {
  'create': {
    alias: 'crt',
    des: '创建项目',
    examples: ['bcli create <projectName>']
  },
  'config': {
    alias: 'cfg',
    des: '定义项目配置',
    examples: [
      'bcli config set <k> <v>',
      'bcli config get <k>'
    ]
  }
}

// 02 利用遍历操作配合 program 来将多个命令的信息渲染出来
Reflect.ownKeys(actionsMap).forEach((action) => {
  program
    .command(action)
    .alias(actionsMap[action].alias)
    .description(actionsMap[action].des)
    .action(() => {
      console.log(action, '执行了........')
    })
})

// 03 提供示例代码演示操作 
program.on('--help', () => {
  console.log('Examples: ')
  Reflect.ownKeys(actionsMap).forEach((action) => {
    actionsMap[action].examples.forEach((item) => {
      console.log("　" + item)
    })
  })
})

program.parse(process.argv)