//Promise/A+规范的三种状态
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
    constructor(executor) {
        // 为传入的执行器再传入两个函数。执行器是立即执行的，所以New Promise操作内部代码是同步的
        executor(this.resolve, this.reject)
    }

    // promise 状态默认为等待状态
    status = PENDING
    // 成功之后的值
    value = undefined
    // 失败后的原因
    reason = undefined

    /**
     * successCallback和failCallback，它们存储的是针对于异步任务的回调函数
     */
    // 存储成功回调的队列
    successCallback = []
    // 存储失败回调的队列
    failCallback = []
    /**
     * 
     * 使用箭头函数原因:
     * 我们是直接调用这些方法的，那么this可能会指向window或者undefined
     * 使用箭头函数则会将this指向通过Promise构造的对象,而我们的方法内部会要获取该this对象上的方法
     * 
     * resolve、reject会接受成功的值和失败的原因
     * 
     * 这些方法被定义在了实例对象上
     */
    resolve = (value) => {
        if (this.status !== PENDING) return   // 对应规范中的"状态只能由pending到fulfilled或rejected"
        this.status = FULFILLED // 变更状态
        // 保存成功的值
        this.value = value;
        // 判断成功回调是否存在，如果有则调用并传入值
        // this.successCallback && this.successCallback(this.value);
        while (this.successCallback.length) {
            const callback = this.successCallback.shift();
            callback(this.value);
        }
    }

    reject = (reason) => {
        if (this.status !== PENDING) return   // 对应规范中的"状态只能由pending到fulfilled或rejected"
        this.status = REJECTED // 变更状态
        // 保存失败的原因
        this.reason = reason;
        // 判断失败回调是否存在，如果有则调用并传入失败原因
        // this.failCallback && this.failCallback(this.reason);
        while (this.failCallback.length) {
            const callback = this.failCallback.shift();
            callback(this.reason);
        }
    }

    // then方法只被promise对象调用，所以不用为箭头函数？此时被定义在了原型上
    then(successCallback, failCallback) {
        // 这里创建的Promise会立即执行，所以基本和之前无变化，只是返回了一个Promise对象，实现了链式调用。
        let thenPromise = new MyPromise((resolve, reject) => {
            switch (this.status) {
                // 对于异步任务，先存储进各自的回调队列，当执行了resolve或reject方法后，再取出回调进行调用
                case PENDING:
                    this.successCallback.push(successCallback);
                    this.failCallback.push(failCallback);
                    break;
                // 对于同步任务，已经改变了状态，直接执行回调
                case FULFILLED:
                    /**
                     * 实现then链式调用：
                     * 获取上个then返回值，用一个变量接收
                     * 在这个Promise中调用它的resolve或reject，就能被下一个.then()的回调获取到返回值，从而实现链式调用。
                     * 
                     * 保证执行顺序：
                     * 所以还要分类讨论返回值,如果是Promise,那么等待Promise状态变更,否则直接resolve
                     */
                    setTimeout(() => {
                        let x = successCallback(this.value);
                        resolvePromise(thenPromise, x, resolve, reject);
                    }, 0)
                    break;
                case REJECTED:
                    failCallback(this.reason);
                    resolvePromise(thenPromise, x, resolve, reject);
                    break;
            }
        })
        return thenPromise;
    }




}
/**
 * 判断 x 的值是普通值还是promise对象
 * 如果是普通值直接调用resolve 
 * 如果是promise对象 查看promsie对象返回的结果 
 * 再根据promise对象返回的结果 决定调用resolve 还是调用reject
 * 放在外面是为了不让使用者调用这个方法吗？
 */
function resolvePromise(thenPromise, x, resolve, reject) {
    if (thenPromise === x) {
        // return 阻止代码继续运行
        return reject(new TypeError('Chaining cycle detected for promise #<Promise>'));
    }
    // 所以如果链式调用then方法，不传入Promise，那么它就会原样不动以类似val => val形式传递下去
    try {
        x instanceof MyPromise ? x.then(resolve, reject) : resolve(x);
    } catch (error) {
        reject(error);
    }
}

module.exports = MyPromise;