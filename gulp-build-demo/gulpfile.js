const {
  src,
  dest,
  parallel
} = require('gulp');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const swig = require('gulp-swig');

const data = {
  menus: [{
      name: 'Home',
      icon: 'aperture',
      link: 'index.html'
    },
    {
      name: 'Features',
      link: 'features.html'
    },
    {
      name: 'About',
      link: 'about.html'
    },
    {
      name: 'Contact',
      link: '#',
      children: [{
          name: 'Twitter',
          link: 'https://twitter.com/w_zce'
        },
        {
          name: 'About',
          link: 'https://weibo.com/zceme'
        },
        {
          name: 'divider'
        },
        {
          name: 'About',
          link: 'https://github.com/zce'
        }
      ]
    }
  ],
  pkg: require('./package.json'),
  date: new Date()
}

const style = () => {
  return src('src/assets/styles/*.scss', {
      base: 'src'
    })
    .pipe(sass({
      outputStyle: 'expanded'
    }))
    .pipe(dest('dist'))
}

const script = () => {
  return src('src/assets/scripts/*.js', {
      base: 'src'
    })
    .pipe(babel({
      presets: ['@babel/preset-env']
    }))
    .pipe(dest('dist'))
}

const page = () => {
  return src('src/*.html', {
      base: 'src'
    })
    .pipe(swig({
      data
    }))
    .pipe(dest('dist'))
}

const compile = parallel(style, script, page);

module.exports = {
  compile
}