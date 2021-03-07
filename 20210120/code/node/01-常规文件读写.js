const fs = require('fs')


/**
 * Buffer 我们通俗的讲它就是一个数据类型，在nodejs 中用于操作二进制，它就表示一片内存空间
 */

// 读文件 ( 此时我们就可以使用 JS 将磁盘中的某一个文件内容读取出来了 )
// fs.readFile('./test.txt', (err, data) => {
//   console.log(data.toString())
// })

// 写操作（将数据写入到磁盘中）
fs.writeFile('./test1.txt', 'zce是个好人', (err) => {
  console.log('写操作执行成功了')
})

/** 当前的API不是没用，要分场景，不适用于大内存的操作，因为都是一次性的 */