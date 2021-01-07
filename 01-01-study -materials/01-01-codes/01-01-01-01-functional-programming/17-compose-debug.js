// 函数组合 调试 
// NEVER SAY DIE  --> never-say-die

const _ = require('lodash')

// const log = v => {
//   console.log(v)
//   return v
// }
const compose = (...args) => value => args.reverse().reduce((acc, fn) => fn(acc), value)
const trace = _.curry((tag, v) => {
  console.log(tag, v)
  return v
})

// _.split()
const split = _.curry((sep, str) => _.split(str, sep))

// _.toLower()
const join = _.curry((sep, array) => _.join(array, sep))

// 转换为数组
const map = _.curry((fn, array) => _.map(array, fn))


const f = compose(join('-'), trace('map 之后'), map(_.toLower), trace('split 之后'), split(' '))

console.log(f('NEVER SAY DIE'))