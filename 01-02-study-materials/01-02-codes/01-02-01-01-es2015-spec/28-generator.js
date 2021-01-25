// Generator 函数

// function * foo () {
//   console.log('zce')
//   return 100
// }

// const result = foo()
// console.log(result.next())

function * foo () {
  let a = 1
  console.log(a);
  console.log('1111')
  a = yield 100;
  console.log(a);
  console.log('2222')
  a = yield 200
  console.log(a);
  console.log('3333')
  a= yield 300
  console.log(a);
}

const generator = foo()

console.log(generator.next(2)) // 第一次调用，函数体开始执行，遇到第一个 yield 暂停
console.log(generator.next(3)) // 第二次调用，从暂停位置继续，直到遇到下一个 yield 再次暂停
console.log(generator.next(4)) // 。。。
console.log(generator.next(5)) // 第四次调用，已经没有需要执行的内容了，所以直接得到 undefined
