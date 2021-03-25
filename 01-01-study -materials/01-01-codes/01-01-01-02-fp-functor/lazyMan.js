class _LazyMan {

    TaskList = []

    constructor(name) {
        const func = () => {
            console.log(`Hi! This is ${name}!`)
        }
        this.TaskList.push(func);

        setTimeout(async () => {
            for(let i = 0; i < this.TaskList.length; i++) {
                if (this.TaskList[i] instanceof Promise) {
                    await this.TaskList[i]
                } else {
                    this.TaskList[i]()
                }
            }
        })
    }

    sleep(time) {
        const func = new Promise(res => {
            setTimeout(() => {
                console.log(`等待了${time}秒`)
                res()
            }, time * 1000);
        })
        this.TaskList.push(func);
        return this;
    }

    eat(foot) {
        const func = () => {
            console.log(`Eat ${foot}~`);
        }
        this.TaskList.push(func);
        return this;
    }

    sleepFirst(time) {
        const func = new Promise(res => {
            setTimeout(() => {
                console.log(`优先等待了${time}秒`)
                res()
            }, time * 1000);
        })
        this.TaskList.unshift(func);
        return this;
    }
}

function LazyMan(name){
    return new _LazyMan(name);
}