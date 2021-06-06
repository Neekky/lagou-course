class Vue {
    constructor(options) {
        // 1. 通过属性保存选项的数据
        this.$options = options || {}
        this.$data = options.data || {}
        this.$el = typeof options.el === 'string' ? document.querySelector(options.el) : options.el
        Vue.prototype.$set = this._set;
        Vue.set = this._set;
        // 2. 把data中的成员转换成getter和setter，注入到vue实例中，方便后续使用
        this._proxyData(this.$data)

        // 3. 调用observer对象，监听数据的变化，存储在实例中
        this.Observer = new Observer(this.$data);

        // 4. 调用compiler对象，解析指令和差值表达式
        new Compile(this)
        
    }

    // 使Vue代理data中的数据
    _proxyData(data) {
        // 遍历data中的所有属性
        Object.keys(data).forEach(key => {
            // 把data的属性注入到vue实例中
            Object.defineProperty(this, key, {
                enumerable: true,
                configurable: true,
                get() {
                    return data[key]
                },
                set(newValue) {
                    if (newValue === data[key]) {
                        return
                    }
                    data[key] = newValue
                }
            })
        })
    }

    // 增加set方法，使用户能将额外属性自定义转化为响应式数据
    _set = (target, key, value) => {
        console.log(target, "target");
        // 判断target是否为null、undefined，是否为string、number、symbol、boolean中的一种
        if (this.isUndef(target) || this.isPrimitive(target)
        ) {
            throw new Error(("不能在null、undefined或其它原始类型数据上设置响应式数据: " + ((target))));
        }
        this.Observer.defineReactive(target, key, value);
    }

    /**
     * 是否为undefined、null
     * @param {*} v 
     * @returns 
     */
    isUndef = (v) => {
        return v === undefined || v === null
    }

    isPrimitive = (v) => {
        return (
            typeof v === 'string' ||
            typeof v === 'number' ||
            // $flow-disable-line
            typeof v === 'symbol' ||
            typeof v === 'boolean'
        )
    }
}