/*
  1. Promise 就是一个类 在执行这个类的时候 需要传递一个执行器进去 执行器会立即执行
  2. Promise 中有三种状态 分别为 成功 fulfilled 失败 rejected 等待 pending
    pending -> fulfilled
    pending -> rejected
    一旦状态确定就不可更改
  3. resolve和reject函数是用来更改状态的
    resolve: fulfilled
    reject: rejected
  4. then方法内部做的事情就判断状态 如果状态是成功 调用成功的回调函数 如果状态是失败 调用失败回调函数 then方法是被定义在原型对象中的
  5. then成功回调有一个参数 表示成功之后的值 then失败回调有一个参数 表示失败后的原因
  6. 同一个promise对象下面的then方法是可以被调用多次的
  7. then方法是可以被链式调用的, 后面then方法的回调函数拿到值的是上一个then方法的回调函数的返回值
*/

const MyPromise = require('./mPromise');

// const p = new MyPromise((resolve, reject) => {
//   // setTimeout(()=>{
//   resolve('成功');
//   // },1000) 
//   // reject('失败');
// });
// p.then((res => {
//   console.log(1)
//   console.log(res);
// }), err => {
//   console.log(1)
//   console.log(err);
// })
// p.then((res => {
//   console.log(2)
//   console.log(res);
// }), err => {
//   console.log(2)
//   console.log(err);
// })

// p.then((res => {
//   console.log(1)
//   console.log(res);
//   // return new MyPromise((resolve) => {
//   //   setTimeout(() => {
//   //     resolve('来吧')
//   //   }, 1000)
//   // });
//   return p
// })).then((res) => {
//   console.log(res,'111')
// })
// const p = new MyPromise((resolve, reject) => {
//   setTimeout(()=>{
//     resolve('成功');
//   },1000)
// });

// 会报自调用错误
// let p2 = p.then(res => {
//   console.log(res);
//   console.log(p2 === p2,'123')
//   return p2
// })

// p2.then(res => {
//   console.log(res);
// },err => {
//   console.log(err)
// })

// 不会报自调用错误
// let p2 = p.then(res => {
//   console.log(res);
//   console.log(p2 === p2,'123')
//   return 111
// }).then(res => {
//   console.log(res);
//   return 123321
// },err => {
//   console.log(err)
// })

// function p1 () {
//   return new MyPromise(function (resolve, reject) {
//     setTimeout(function () {
//       resolve('p1')
//     }, 2000)
//   })
// }
// function p2 () {
//   return new MyPromise(function (resolve, reject) {
//     reject('失败')
//     // resolve('成功');  
//   })
// }

// p2()
//   .then(value => console.log(value))
//   .catch(reason => console.log(reason))

const p = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('成功');
    // reject('失败')
  }, 100)
});

// p.then(res => {
//   console.log(res);
//   return new MyPromise(res => {
//     setTimeout(()=>{
//       res('延时返回')
//     }, 1000)
//   })
// }, err => {
//   console.log(err);
//   setTimeout(()=>{
//     return '延时返回'
//   })
// }).then(res => {
//   return 222
// }, err => {
//   console.log(err, '我是失败的')
// })

// p.then(1).then(2).then((res) => {
//   console.log(res,1)
// }, (err) => {
//   console.log(err, '失败')
// })

// 测试all方法

const p1 = new MyPromise((res) => {
  setTimeout(() => {
    res('2s')
  }, 2000)
})

const p2 = new MyPromise((res, rej) => {
  setTimeout(() => {
    rej(2)
    return 111111
  }, 3000)
})

// let p3 = MyPromise.all(['a', 'b', p1, p2, 'd'])
// p3.then(res => {
//   console.log(
//     res
//   )
// })

// MyPromise.resolve(p1).then(res => console.log(res, 'resolve'))
// MyPromise.reject(
//   new MyPromise((res ,rej) => { rej('sb') })
//   // 11111
// ).then(res => console.log(res, 'resolve'), err => console.log(err, 'reject'))

// p2.finally(() => {
//   console.log('finally')
//   return p1
// }).then(res => {
//   console.log(res,'then之后的')
// }, err => {
//   console.log(err,'err')
// })

// p2.then(res => {
//   console.log(res, '成功了');
// }).then().catch(err => console.log(err, '失败了'))

MyPromise.race([p1,p2]).then(res => {
  console.log(res,'111111');
}).catch(err => {
  console.log(err,'失败了');
})