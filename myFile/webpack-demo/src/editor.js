import './editor.css'

export default () => {
  const editorElement = document.createElement('div')

  editorElement.contentEditable = true
  editorElement.className = 'editor'
  editorElement.id = "haha"

  console.log('editor init c1omple11ted')

  return editorElement
}
