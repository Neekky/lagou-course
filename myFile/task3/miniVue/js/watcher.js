class Watcher {
    constructor(vm, key, cb) {
        this.vm = vm;
        // data中的属性名称
        this.key = key;
        // 回调函数负责更新视图
        this.cb = cb;
        // 把watcher对象记录到Dep类的静态属性target，
        Dep.target = this
        // 使用oldValue存储实例中对应属性的内存地址，这里会触发get方法，而此时在get方法中则会触发addSub方法，将该Watcher添加到dep的subs中
        this.oldValue = vm[key]
        // 在此处释放，防止被多次重复添加
        Dep.target = null
    }

    // 当数据发生变化的时候更新视图
    update() {
        let newValue = this.vm[this.key]
        if (this.oldValue === newValue) {
            return
        }
        this.cb(newValue)
    }
}