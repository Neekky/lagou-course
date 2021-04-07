#! /usr/bin/env node
const { program } = require('commander')
const mainFn = require('..')
const version = require('../package.json').version


// 自定义格式来存储数据
const actionsMap = {
  'create': {
    alias: 'crt',
    des: '创建项目',
    examples: ['icli create <projectName>']
  },
  'config': {
    alias: 'cfg',
    des: '配置项目选项',
    examples: [
      'icli config set <k> <v>',
      'icli config get <k>'
    ]
  }
}

// 遍历自定义的命令数据
Reflect.ownKeys(actionsMap).forEach((action) => {
  program
    .command(action)
    .alias(actionsMap[action].alias)
    .description(actionsMap[action].des)
    .action(() => {
      // 某个命令被触发后执行后续操作
      // 加载入口，传递参数
      let params = process.argv.slice(3)
      mainFn(action, params)
    })
})

// 处理示例
program.on('--help', () => {
  console.log('Examples: ')
  Reflect.ownKeys(actionsMap).forEach((action) => {
    actionsMap[action].examples.forEach((item) => {
      console.log("　" + item)
    })
  })
})

// 我们只需要将原生的命令行参数信息传给 program 它就会帮我们实现 “格式化”
program.version(version).parse(process.argv)
