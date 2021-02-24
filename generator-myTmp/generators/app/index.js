const Generator = require('yeoman-generator')

module.exports = class extends Generator {

    prompting() {
        // Yeoman 在询问用户环节会自动调用此方法
        // 在此方法中可以调用父类的 prompt() 方法发出对用户的命令行询问
        return this.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Your project name',
                default: this.appname // appname 为项目生成目录名称
            }
        ])
            .then(answers => {
                // answers => { name: 'user input value' }
                this.answers = answers
            })
    }

    writing() {
        // ! 使用copyTpl方式
        // const tmpl = this.templatePath('foo.txt')
        // // 输出目标路径
        // const output = this.destinationPath('foo.txt')
        // // 模板数据上下文
        // const context = { title: '学会知足', success: false }

        // this.fs.copyTpl(tmpl, output, context)


        // 模板文件路径
        const tmpl = this.templatePath('bar.html')
        // 输出目标路径
        const output = this.destinationPath('bar.html')
        // 模板数据上下文
        const context = this.answers;

        this.fs.copyTpl(tmpl, output, context)

        // ! 使用copy方式

        const context = { title: 'yeoman', success: false }

        this.fs.copy(
            this.templatePath('**'),
            this.destinationPath('./'),
            {},
            context
        )
    }
}