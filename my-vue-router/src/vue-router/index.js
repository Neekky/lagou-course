
let _Vue = null
export default class VueRouter {
  static install (Vue) {
    // 1 判断当前插件是否被安装
    if (VueRouter.install.installed) {
      return
    }
    VueRouter.install.installed = true
    // 2 把Vue的构造函数记录在全局中，将来要在Vue-Router实例方法中，使用到这个Vue的构造函数，比如创建组件时需使用Vue.Component
    _Vue = Vue
    // 3 把创建Vue的实例时传入的router对象注入到所有Vue实例，让所有实例共享一个成员
    console.log(this, '方法外部的this')
    // 在创建Vue实例时，Vue会将options中自定义的属性和Vue构造函数中定义的属性合并为vm.$options
    _Vue.mixin({
      beforeCreate () {
        // 此处只执行一次，如果是组件则不执行，是Vue实例则执行
        if (this.$options.router) {
          console.log(this === _Vue, 'Vue实例')
          console.log(this, 'this')
          console.log(_Vue, '_Vue')
          console.log(this.$options.router, '方法里面的this')
          _Vue.prototype.$router = this.$options.router
          this.$options.router.init()
        }
      }
    })
  }

  constructor (options) {
    // 初始化options、routeMap、data属性
    this.options = options

    // 在router-view组件中，会根据路由地址去routeMap中找对应组件
    this.routeMap = {}

    // data是一个响应式对象，因为它存储着当前路由地址，地址变化时要加载对应组件
    this.data = _Vue.observable({
      current: '/' // 默认为 /
    })

    this.init()
  }

  init () {
    this.createRouteMap()
    this.initComponent(_Vue)
  }

  // 将构造函数传入的routes（路由配置表），转换成键值对形式，传入routeMap对象中
  // 健就是路由地址，值就是所对应的组件
  createRouteMap () {
    // 遍历所有的路由规则，把路由规则解析成键值对的形式存储到routeMap中
    this.options.routes.forEach(route => {
      this.routeMap[route.path] = route.component
    })
  }

  initComponent (Vue) {
    // 通过Vue.component注册组件
    Vue.component('router-link', {
      props: {
        to: String
      },
      //   render (h) {
      //     return h('a', {
      //       attrs: {
      //         href: this.to
      //       },
      //       on: {
      //         click: this.clickhander
      //       }
      //     }, [this.$slots.default])
      //   },
      methods: {
        clickhander (e) {
          history.pushState({}, '', this.to)
          this.$router.data.current = this.to
          e.preventDefault()
        }
      },
      template: "<a :href='to' @click={{this.clickhander}}><slot></slot><>"
    })
  }
}
