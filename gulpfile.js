const {src, dest, series, parallel, watch} = require('gulp')
const sass = require('gulp-sass')
const csso = require('gulp-csso')
const include = require('gulp-file-include')
const htmlmin = require('gulp-htmlmin')
const del = require('del')
const concat = require('gulp-concat')
const autoprefixer = require('gulp-autoprefixer')
const sync = require('browser-sync').create()

function html() {
  return src('src/**.html')
    .pipe(include({
      prefix: '@@'
    }))
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(dest('dist'))
}

const jsFiles = [
  'src/scripts/libs/jquery-3.5.1.min.js',
  'src/scripts/libs/slick.min.js',
  'src/scripts/scripts.js'
];

function scripts() {
  return src(jsFiles)
  .pipe(concat('scripts.js'))
  .pipe(dest('dist'));
}

function images() {
	return src('src/images/**/*.*')
	.pipe(dest('dist/images'))
}

function fonts() {
	return src('src/fonts/**/*.*')
    .pipe(dest('dist/fonts'));
}

function scss() {
  return src('src/scss/main.scss')
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(csso())
    .pipe(concat('main.css'))
    .pipe(dest('dist'))
}

function clear() {
  return del('dist')
}

function serv() {
  sync.init({
    server: './dist'
  })

  watch('src/**/*.html', series(html)).on('change', sync.reload)
  watch('src/scripts/**/*.js', series(scripts)).on('change', sync.reload)
  watch('src/scss/**/*.scss', series(scss)).on('change', sync.reload)
  watch('src/images/**/*.*', series(images)).on('change', sync.reload)
}

exports.build = series(clear, scss, scripts, parallel(images, fonts, html))
exports.serv = series(clear, scss, scripts, parallel(images, fonts, html), serv)
exports.clear = clear