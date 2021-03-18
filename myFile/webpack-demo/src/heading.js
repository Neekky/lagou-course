import "./main.css";
import icon from "./img/icon.png";

export default () => {
  const element = document.createElement('h2')

  element.textContent = 'Hello world'
  element.addEventListener('click', () => {
    alert('Hello webpack')
  })

  return element
}

const img = new Image()
img.src = icon

document.body.append(img)