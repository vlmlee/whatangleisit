const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const autoprefixer = require('gulp-autoprefixer');

function css() {
  return gulp.src('lib/stylesheets/*.css')
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(gulp.dest('public/stylesheets/'));
}

function js() {
  return gulp.src('lib/javascripts/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('public/javascripts/'));
}

exports.js = js;
exports.css = css;
exports.default = gulp.series(js, css);
