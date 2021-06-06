import {
  init,
  h,
  // 1. 导入模块
  attributesModule,
  eventListenersModule,
} from "snabbdom";

let patch = init([attributesModule, eventListenersModule])

const data = [1, 2, 3, 4]
let oldVnode = null

function view (data) {
  let arr = []
  data.forEach(item => {
    // 不设置 key
    // arr.push(h('li', [h('input', { attrs: { type: 'checkbox' } }), h('span', item)]))
    // 设置key
    arr.push(h('li', { key: item }, [h('input', { attrs: { type: 'checkbox' } }), h('span', item)]))
  })
  let vnode = h('div', [ h('button', { on: { click: function () {
    data.unshift(100)
    vnode = view(data)
    oldVnode = patch(oldVnode, vnode)
  } } }, '按钮') , h('ul', arr)])
  return vnode
}


let app = document.querySelector('#app')
// 首次渲染
oldVnode = patch(app, view(data))
