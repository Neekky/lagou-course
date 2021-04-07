#! /usr/bin/env node
const { program } = require('commander')


// 接收参数，配置自定义命令
program
  .command('create')
  .alias('crt')
  .description('创建指定的项目')
  .action(() => {
    console.log('create 命令执行')
  })

// 我们只需要将原生的命令行参数信息传给 program 它就会帮我们实现 “格式化”
program.parse(process.argv)
