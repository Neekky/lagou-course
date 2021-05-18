import {
    init,
    h,
    // 1. 导入模块
    styleModule,
    eventListenersModule,
} from "snabbdom";

// 2. 注册模块
const patch = init([
    styleModule,
    eventListenersModule
])

// 3. 使用h() 函数的第二个参数传入模块中使用的数据（对象）
let vnode = h('div', [
    h('span', "你的机械键盘敲击声好烦啊！"),
    h('h1', {
        style: {
            backgroundColor: 'red'
        }
    }, 'Hello World'),
    h('p', {
        on: {
            click: eventHandler
        }
    }, 'Hello P')
])

function eventHandler() {
    alert('别点我，疼')
}

let app = document.querySelector('#app')
patch(app, vnode)