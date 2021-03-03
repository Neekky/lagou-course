const {
  src,
  dest,
  parallel,
  series
} = require('gulp');

const loadPlugins = require('gulp-load-plugins');
const plugins = loadPlugins();
const browserSync = require('browser-sync');

const del = require('del');
const bs = browserSync.create();

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

const clean = () => {
  return del(['dist'])
}

const style = () => {
  return src('src/assets/styles/*.scss', {
    base: 'src'
  })
    .pipe(plugins.sass({
      outputStyle: 'expanded'
    }))
    .pipe(dest('dist'))
}

const script = () => {
  return src('src/assets/scripts/*.js', {
    base: 'src'
  })
    .pipe(plugins.babel({
      presets: ['@babel/preset-env']
    }))
    .pipe(dest('dist'))
}

const page = () => {
  return src('src/*.html', {
    base: 'src'
  })
    .pipe(plugins.swig({
      data
    }))
    .pipe(dest('dist'))
}

const image = () => {
  return src('src/assets/images/**', {
    base: 'src'
  })
    .pipe(plugins.imagemin())
    .pipe(dest('dist'))
}

const font = () => {
  return src('src/assets/fonts/**', {
    base: 'src'
  })
    .pipe(plugins.imagemin())
    .pipe(dest('dist'))
}

const extra = () => {
  return src('public/**', { base: 'public' })
    .pipe(dest('dist'))
}

const compile = parallel(style, script, page, image, font);

const build = series(clean, parallel(compile, extra));

module.exports = {
  compile,
  build,
  clean
}