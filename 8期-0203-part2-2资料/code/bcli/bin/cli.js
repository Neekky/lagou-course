#! /usr/bin/env node
const mainFn = require('..')
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
      // 当我们的某一个自定义动作执行时，我们真正想做的事情应该是写在这里的
      // 而我们想做事情的前提就是拿到当前动作执行时所传入的数据 
      // 拿到这个数据之后交给我们的代码来和电脑交互
      // 01 当前正在执行的动作名称是保存在 action 里的，不需要从原始的参数数组中获取
      // 02 动作名称后的参数们需要从这里拿

      // 03 如果我们采用下面的方式来截取参数，那么一定要记着他是放在了一个数组当中
      // 此时我们只是拿到了动作名， 和它对应的参数，没考虑如何用 
      // 总结： cli.js 做二件事情，第一就是处理命令格式，第二就是获取数据，同时将它传给入口
      let params = process.argv.slice(3)
      mainFn(action, params)
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