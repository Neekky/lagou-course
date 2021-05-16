import {
    init,
    h,
} from "snabbdom";

const patch = init([]);

// 第二个参数，传数组则是子元素，每个元素都是VNode对象
const vnode = h('div#container', [
    h('h1', 'Hello Snabbdom'),
    h('p', '这是一个p')
])

const app = document.querySelector('#app')
const oldVnode = patch(app, vnode)

setTimeout(() => {
    const vnode = h('div#container', [
      h('h1', 'Hello World'),
      h('p', 'Hello P')
    ])
    patch(oldVnode, vnode)
  
    // 清除div中的内容
    patch(oldVnode, null)
  }, 2000);
