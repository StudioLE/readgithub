// Core modules
var ver = require('./package.json').version

// Node modules
const { src, dest, parallel } = require('gulp')
var gp_bump = require('gulp-bump')
var gp_clean = require('gulp-clean')
var gp_rename = require('gulp-rename')
var gp_uglify = require('gulp-uglify')
var gp_minify = require('gulp-minify-css')

// Bump version
var bump = function() {
  return src(['./bower.json', './package.json'])
  .pipe(gp_bump({
    // type:'prerelease'
  }))
  .pipe(dest('./'))
}

// Clean build directory
var clean = function () {
  return src('dist', {
    // read: false
  })
  .pipe(gp_clean())
}

// Build app CSS
var css = function() {
  return src('src/readgithub.css')
  .pipe(dest('dist/css'))
  .pipe(gp_rename('readgithub.min.css'))
  .pipe(gp_minify({ keepSpecialComments: 0 }))
  .pipe(dest('dist/css'))
}

// Build app JS
var js = function() {
  return src('src/readgithub.js')
  .pipe(dest('dist/js'))
  .pipe(gp_rename('readgithub.min.js'))
  .pipe(gp_uglify())
  .pipe(dest('dist/js'))
}

// Tasks
exports.bump = parallel(bump)
exports.clean = parallel(clean)
exports.build = parallel(css, js)
exports.default = exports.build
