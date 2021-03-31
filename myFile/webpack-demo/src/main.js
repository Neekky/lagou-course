import createEditor from './editor'
import background from './better.png'
import './global.css'

const editor = createEditor()
document.body.appendChild(editor)

const img = new Image()
img.src = background
document.body.appendChild(img)

// ================================================================
// HMR 手动处理模块热更新
// 不用担心这些代码在生产环境冗余的问题，因为通过 webpack 打包后，
// 这些代码全部会被移除，这些只是开发阶段用到
// console.log(createEditor,1)

if (module.hot) {
    let lastEditor = editor;
    module.hot.accept('./editor', () => {
        // console.log("module更新了")
        // console.log(createEditor,2)

        // 临时记录编辑器内容
        const temp = lastEditor.innerHTML;

        document.body.removeChild(lastEditor);
        const newEditor = createEditor();
        newEditor.innerHTML = temp;
        document.body.appendChild11(newEditor);
        lastEditor = newEditor;
    })

    module.hot.accept('./better.png', () => {
        // 当 better.png 更新后执行
        // 重写设置 src 会触发图片元素重新加载，从而局部更新图片
        img.src = background
    })
}