// 模拟 lodash 中的 flowRight

const reverse = (arr, index) => {
    console.log(index)
    return arr.reverse()
}
const first = arr => arr[0]
const toUpper = s => s.toUpperCase()


// function compose (...args) {
//   return function (value) {
//     return args.reverse().reduce(function (acc, fn) {
//       return fn(acc)
//     }, value)
//   }
// }

// const compose = (...args) => value => args.reverse().reduce((acc, fn) => fn(acc), value)


// const compose = (...funcs) => funcs.reduce((acc, fn) => (...args) => acc(fn(...args)))

const f = compose(compose(toUpper, first), reverse)
console.log(f(['one', 'two', 'three'], 1))

// 写法一：redux中间件官方写法
function compose(...funcs) {
    if (funcs.length === 0) {
        // 如果没有要组合的函数，则返回的函数原封不动的返回参数
        return args => args; 
    } else if (funcs.length === 1) {
        // 要组合的函数只有一个
        return funcs[0];
    }
    // 无比简洁
    return funcs.reduce((acc, fn) => (...args) => acc(fn(...args)))
}

// 写法二：可读性好一些的写法
// function compose(...funcs) {
//     if (funcs.length === 0) {
//         return args => args;
//     } else if (funcs.length === 1) {
//         return funcs[0];
//     }
//     // 这是可读性好一些的写法，和上面代码功能一样
//     return function (...args) {
//         let lastReturn = null; // 记录上一个函数返回的值
//         for (let i = funcs.length - 1; i >= 0; i--) {
//             const func = funcs[i];
//             if (i === funcs.length - 1) {
//                 lastReturn = func(...args);
//             } else {
//                 lastReturn = func(lastReturn);
//             }
//         }
//         return lastReturn;
//     }
// }

// 写法三：可读性好一些的写法
// function compose(...funcs) {
//     const length = funcs.length
//     // 倒转数组，变为flowRight
//     funcs.reverse();
//     if (length === 0) {
//         return args => args;
//     } else if (length === 1) {
//         return funcs[0];
//     }
//     return function (...args) {
//         let index = 0
//         let result = length ? funcs[index].apply(this, args) : args[0]
//         while (++index < length) {
//             result = funcs[index].call(this, result)
//         }
//         return result
//     }
// }


// function compose(...funcs) {
//     const length = funcs.length
//     // 倒转数组，变为flowRight
//     if (length === 0) {
//         return args => args;
//     } else if (length === 1) {
//         return funcs[0];
//     }
//     return (...args) => funcs.reverse().reduce((acc, fn) => {
//         return Object.prototype.toString.call(acc) === '[object Function]' ? fn(acc) : fn(...acc)
//     }, args);
// }


// 可浓缩为以下代码
// const compose = (...args) => value => args.reverse().reduce((acc, fn) => fn(acc), value)