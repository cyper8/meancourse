var gulp = require('gulp');
var browserify = require('gulp-browserify');

gulp.task('browserify', function() {
  return gulp
    .src('./frontend/app.js')
    .pipe(browserify())
    .pipe(gulp.dest('./frontend/js'));
});

gulp.task('browserifyTests',function(){
  return gulp
    .src('./frontend/tests/index.js')
    .pipe(browserify())
    .pipe(gulp.dest('./frontend/js/test'));
});

gulp.task('watch', function() {
  gulp.watch(['./frontend/*.js'], ['browserify']);
  gulp.watch(['./frontend/tests/*.js'], ['browserifyTests']);
});
