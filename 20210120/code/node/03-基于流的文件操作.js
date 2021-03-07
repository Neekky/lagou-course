/**
 * 提到流，10989你想到的就是 createReadStream 和 .....
 * 但是我想说：
 *  流是先于 node 出现的一个技术 ，这个技术是用于处理数据的
 *  而node只不过是在内部实现了它的一些操作接口，有一个模块叫 stream
 *  在这个模块中提供了四种类：readable writable duplex transform
 *
 * 而上面的二个方法是属于 fs 模块的，由于 node中的 fs 模块继承了 stream ，因此我们才能让 fs 进行流操作
 *
 */

const fs = require('fs')

let rs = fs.createReadStream('./test.txt') // 64
let ws = fs.createWriteStream('./test3.txt')  // 16

rs.pipe(ws)

/**
 * 01 通过一个过程我们推演出一 pip
 * 02 三种方式所涉及到的 API 各有利弊
 *
 * (生产者消费者模型)
 * 03 pipe 的左侧一般是可读流，就是数据的生产者，我们也称之为叫上游
 * 04 右侧就是可写流，用于数据消费，下游
 * 05 关于 pipe 还有一个名词叫背压机制（）
 *
 * 在 gulp 中所有的插件都转换流，这也是我们在实际应用中使用最多的一种流
 * 可读可写可操作
 * gulp 的插件其实就是采用 node.js 写一个转换流，导出即可
 * 
 * 前端框架===》 后端===》typescript node.js 
 */
