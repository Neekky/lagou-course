const sass = require('sass');

module.exports = grunt => {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        watch: {
            js: {
                files: ['src/js/*.js'],
                tasks: ['babel']
            },
            css: {
                files: ['src/scss/*.scss'],
                tasks: ['sass']
            }
        },
        babel: {
            options: {
                presets: ['@babel/preset-env'],
                sourceMap: true
            },
            main: {
                files: {
                    'dist/js/app.js': 'src/js/app.js'
                }
            }
        },
        sass: {
            options: {
                implementation: sass,
                sourceMap: true
            },
            dist: {
                files: {
                    'dist/css/main.css': 'src/scss/main.scss',
                    'dist/css/home.css': 'src/scss/home.scss',
                }
            }
        },
        clean: {
            dist: 'dist/*',
            filder: 'temp/*'
        },
        async: {
            a: 123321
        },
        build: {
            options: {
                a: 1,
                b: 2
            },
            css: {
                options: {
                    a: 5,
                    b: 6
                }
            },
            js: '2'
        },
        log: {
            foo: [1, 2, 3],
            bar: 'hello world',
            baz: false
        }
    })
    grunt.registerTask('foo', () => {
        let temp = grunt.config('async');
        console.log('hello, foo grunt', temp);
    })

    grunt.registerTask('bar', '来描述下我的任务是什么', () => {
        console.log('hello, 你是谁啊');
    })

    // grunt.registerTask('async-task', '异步任务', () => {
    //     setTimeout(() => {
    //         console.log('我是一个异步的任务')
    //     }, 1000);
    // })

    // grunt.registerTask('default', () => {
    //     console.log('default 哈哈哈')
    // })

    grunt.registerTask('default', ['clean', 'sass', 'watch', 'foo', 'bar'])

    grunt.registerTask('async', '异步任务', function () {
        const done = this.async();
        setTimeout(() => {
            console.log('我是一个异步的任务')
            done()
        }, 2000);
    })

    grunt.registerTask('bad', '失败任务', () => {
        console.log('这个任务失败了');
        return false
    })

    grunt.registerTask('bad-async', '异步任务', function () {
        const done = this.async();
        setTimeout(() => {
            console.log('我是一个异步的任务')
            done(false)
        }, 2000);
    })

    grunt.registerMultiTask('build', function () {
        console.log('多任务')
        console.log(this.options())
    })

    grunt.registerMultiTask('log', 'Log stuff.', function () {
        grunt.log.writeln(this.target + ': ' + this.data);
        console.log(this.target + ': ' + this.data)
    });

    // 加载插件
    // grunt.loadNpmTasks('grunt-contrib-clean')

    // grunt.loadNpmTasks('grunt-sass')
}