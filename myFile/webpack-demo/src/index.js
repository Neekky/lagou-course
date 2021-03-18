import createHeading from './heading.js'
import './main.css'

const heading = createHeading()

document.body.append(heading)

const test = () => {
    console.log(111);
}

class A {
    constructor() {
        console.log(2222);
    }
}
