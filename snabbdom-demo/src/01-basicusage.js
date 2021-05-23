import {
    init,
    h,
} from "snabbdom";

const patch = init([]);

// 第一个参数：标签+选择器
// 第二个参数：如果是字符串就是标签中的文本内容

const vnode = h('div#container.cls', {
    test: 1,
    ahha: 2,
    hook: {
        init(vnode) {
            console.log(vnode.elm, "我是init啊");
        },
        create(emptyNode, vnode) {
            console.log(emptyNode, vnode, "我是create啊");
        },
        post() {
            /* patch complete */
            console.log("我是个post啊");
        },
    }
}, "Hello World");

const app = document.querySelector('#app')

// 第一个参数：旧的 VNode，可以是 DOM 元素，内部会将其转化为VNode，进行对比
// 第二个参数：新的 VNode
// 返回新的 VNode
const oldVnode = patch(app, vnode)

const newVNode = h('div#container.xxx', 'Hello Snabbdom')
patch(oldVnode, newVNode)