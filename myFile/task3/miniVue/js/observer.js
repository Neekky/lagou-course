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
        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: true,
            get: () => {
                console.log("在Observer中被get获取")
                // 这里为什么不返回obj[key]
                return val;
            },
            set: (newVal) => {
                console.log("在Observer中被set设置")
                if (newVal === val) return
                val = newVal
                this.walk(newVal)
                // 发送通知
            }
        })
    }
}