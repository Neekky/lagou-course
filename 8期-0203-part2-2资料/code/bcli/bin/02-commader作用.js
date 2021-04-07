#! /usr/bin/env node
const { program } = require('commander')

// 通过 process 可以访问到命令执行时的参数
// 此时我们可以自定来编码实现对命令帮助信息的格式化处理，但是同样也有很多好用的第三方包

program.parse(process.argv)