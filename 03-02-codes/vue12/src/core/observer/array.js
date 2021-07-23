/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

import { def } from "../util/index";

const arrayProto = Array.prototype;
// 使用数组的原型创建一个新的对象
export const arrayMethods = Object.create(arrayProto);

// 修改数组元素的方法，它们有共同点，都会修改原数组，在数组发生变化时调用notify方法，去发送通知，通知watcher
const methodsToPatch = [
  "push",
  "pop",
  "shift",
  "unshift",
  "splice",
  "sort",
  "reverse",
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  // 保存数组原方法
  const original = arrayProto[method];
  // 调用 Object.defineProperty() 重新定义修改数组的方法
  def(arrayMethods, method, function mutator(...args) {
    // 执行数组的原始方法
    const result = original.apply(this, args);
    // 获取数组对象的 ob 对象
    const ob = this.__ob__;

    // 用来处理数组中新增的元素。
    let inserted;
    switch (method) {
      // 传入的参数就是要新增的元素
      case "push":
      case "unshift":
        inserted = args;
        break;
      // splice方法第3个参数，是新增的元素，存储到splice里面来
      case "splice":
        inserted = args.slice(2);
        break;
    }
    // 对插入的新元素，重新遍历数组元素设置为响应式数据
    if (inserted) ob.observeArray(inserted);
    // notify change
    // 调用了修改数组的方法，调用数组的ob对象发送通知
    ob.dep.notify();
    return result;
  });
});
