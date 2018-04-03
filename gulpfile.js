var del = require('del');
var gulp = require('gulp');
var html5Lint = require('gulp-html5-lint');
var htmlLint = require('gulp-html-lint');
var sass = require('gulp-sass');
var runSequence = require('run-sequence');
var vinylPaths = require('vinyl-paths');

/*
  Task to clean up the dist directories
 */
gulp.task('clean', function() {
  return gulp.src(['dist'])
    .pipe(vinylPaths(del));
});

/*
  Compile sass into CSS
 */
gulp.task('sass', function() {
  return gulp.src('./sass/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('dist'));
});


gulp.task('html5', function() {
  return gulp.src('./src/**/*.html')
    .pipe(htmlLint())
    .pipe(htmlLint.format())
    // .pipe(htmlLint.failOnError())
    .pipe(gulp.dest('./dist'));
});

gulp.task('build', (done) => {
  runSequence('clean', ['sass', 'html5'], done)
});

gulp.task('default', ['build']);
