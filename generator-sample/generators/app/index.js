
// 此文件作为 generator 的核心入口
// 需要导出一个继承自Yeoman Generator的类型
// Yeoman Generator在工作时会自动调用我们在此类型中定义的一些生命周期方法

// 我们在这些方法中可以通过调用父类提供的一些工具方法实现一些功能，例如文件写入


const Generator = require('yeoman-generator')

module.exports = class extends Generator {
    writing () {
        // Yeoman 自动在生成文件阶段调用此方法
        // 我们这里尝试往项目目录中写入文件，通过父类中的fs模块去写入到目录，
        // 该fs模块是高度封装的，比node原生的fs模块更加强大
        // this.fs.write(
        //     this.destinationPath("text.txt"),
        //     "这是第一个Yeoman模块，看看是啥样的"
        // )

        
    }
}