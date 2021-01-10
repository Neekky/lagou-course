// IO Monad
const fs = require('fs')
const fp = require('lodash/fp')

class IO {
  static of (value) {
    return new IO(function () {
      return value
    })
  }

  constructor (fn) {
    this._value = fn
  }

  // 作用是将函数组合起来，返回一个IO函子，_value存储组合好的函数，而不是像其它函子，返回的是值
  map (fn) {
    return new IO(fp.flowRight(fn, this._value))
  }

  join () {
    return this._value()
  }

  // 就是将先调用map方法，将fn方法和之前的_value中方法组合起来，又得到一个IO函子，再调用join方法，我们就拿到了新组合好的方法本身，等于是少了一层嵌套，这个_value既代表了是个组合函数，同时它也可看作是一个值得传递。
  flatMap (fn) {
    console.log(this._value, 'this._value')
    console.log(this.map(fn), 'this.map(fn)')
    return this.map(fn).join()
  }
}

let readFile = function (filename) {
  return new IO(function () {
    return fs.readFileSync(filename, 'utf-8')
  })
}

let print = function (x) {
  return new IO(function () {
    console.log(x)
    return x
  })
}

let r = readFile('package.json')
          // .map(x => x.toUpperCase())
          .map(fp.toUpper)
          .flatMap(print)
          .join()
r
console.log(r)