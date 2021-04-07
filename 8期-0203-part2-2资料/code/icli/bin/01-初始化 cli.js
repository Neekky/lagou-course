#! /usr/bin/env node
const { program } = require('commander')

/**
 * 当前模块需要做的事情：
 *  01 自定义命令，处理格式
 *  02 接收命令行参数，传给功能模块
 */

// 默认情况下通过 argv 可以接收到命令行中的参数
// 自行处理会非常的麻烦
console.log(process.argv)
