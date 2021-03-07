// fis.match('*.{js,scss,png}', {
//     release: '/assets/$0'
// })

fis.match('**/*.scss', {
    parser: fis.plugin('node-sass')
});