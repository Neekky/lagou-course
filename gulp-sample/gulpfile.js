const { series, parallel, src, dest } = require('gulp')
const fs = require('fs');
const { Transform } = require('stream');
const cleanCss = require('gulp-clean-css');
const rename = require('gulp-rename')

const task1 = done => {
    setTimeout(() => {
        console.log('task1 working~')
        done()
    }, 1000)
}

const task2 = done => {
    setTimeout(() => {
        console.log('task2 working~')
        done()
    }, 1000)
}

const task3 = done => {
    setTimeout(() => {
        console.log('task3 working~')
        done()
    }, 1000)
}

const seriesTask = series(task1, task2, task3);
const parallelTask = parallel(task1, task2, task3);

exports.foo = done => {
    // place code for your default task here
    setTimeout(() => {
        console.log(123123);
    }, 1000);
    done();
};

exports.seriesComp = parallel(seriesTask, parallelTask)

exports.callback = done => {
    console.log('执行callback')
    done()
}

exports.callback_error = done => {
    console.log('执行callback error')
    done(new Error('task failed'))
}

exports.promise = () => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(111)
        }, 2000);
    });
}

exports.async = async () => {
    const { version } = fs.readFileSync('package.json');
    console.log(version);
    await Promise.resolve('some result');
}

exports.stream = () => {
    const readStream = fs.createReadStream('package.json');
    const writeStream = fs.createWriteStream('temp.txt');
    readStream.pipe(writeStream);

    // 返回出去，gulp可自动根据流的状态，判定是否完成
    return readStream;
}

exports.readAndWrite = () => {
    // 文件读取流
    const readStream = fs.createReadStream('normalize.css')

    // 文件写入流
    const writeStream = fs.createWriteStream('normalize.min.css')

    const transformStream = new Transform({
        // 核心转换过程
        transform: (chunk, encoding, callback) => {
            // chunk => 读取流中读取到的内容（Buffer）
            const input = chunk.toString()
            const output = input.replace(/\s+/g, '').replace(/\/\*.+?\*\//g, '')
            callback(null, output)
        }
    })

    return readStream
        .pipe(transformStream) // 转换
        .pipe(writeStream) // 写入;
}

exports.dealFile = () => {
    return src('src/*.css')
        .pipe(cleanCss())
        .pipe(rename({ extname: '.min.css' }))
        .pipe(dest('dist'));
}
