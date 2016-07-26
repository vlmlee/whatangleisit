var gulp = require('gulp'),
    lazypipe = require('lazypipe'),
    cleanCSS = require('gulp-clean-css'),
    uglify = require('gulp-uglify'),
    autoprefixer = require('gulp-autoprefixer');

var cssTasks = lazypipe()
    .pipe(autoprefixer)
    .pipe(cleanCSS)
    .pipe(gulp.dest, 'public/stylesheets/');

var jsTasks = lazypipe()
    .pipe(uglify)
    .pipe(gulp.dest, 'public/javascripts/');

gulp.task('js', function() {
    return gulp.src('lib/javascripts/*.js').pipe(jsTasks());
})

gulp.task('css', function() {
    return gulp.src('lib/stylesheets/*.css').pipe(cssTasks());
})
gulp.task('default', ['js', 'css'], function() {
    console.log('Working on js and css...');
});
