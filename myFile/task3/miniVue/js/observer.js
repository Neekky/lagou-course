class Observer {
    constructor(data) {
        this.walk(data)
    }

    walk(data) {
        // 1. 判断data是否是对象
        if (!data || typeof data !== 'object') {
            return
        }
        // 2. 遍历data对象的所有属性
        Object.keys(data).forEach(key => {
            this.defineReactive(data, key, data[key])
        })
    }

    // 为什么defineReactive要传第三个参数--val
    defineReactive(obj, key, val) {
        // 如果val是对象，把val内部的属性转换成响应式数据
        this.walk(val);
        // 创建dep对象，收集依赖
        const dep = new Dep();
        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: true,
            get: () => {
                Dep.target && dep.addSub(Dep.target)
                // 这里为什么不返回obj[key]
                return val;
            },
            set: (newVal) => {
                if (newVal === val) return
                val = newVal
                this.walk(newVal)
                console.log(dep, 'dep闭包')
                // 发送通知
                dep.notify();
            }
        })
    }
}