var gulp = require('gulp');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

var srcPath = 'src/ng-sort-set.js';

gulp.task('lint', function () {
  return gulp.src(srcPath)
             .pipe(jshint())
             .pipe(jshint.reporter('default'));
});

gulp.task('build', function () {
  return gulp.src(['src/ng-sort-set.prefix', srcPath, 'src/ng-sort-set.suffix'])
             .pipe(concat('all.js'))
             .pipe(rename('ng-sort-set.js'))
             .pipe(gulp.dest('dist'))
             .pipe(uglify())
             .pipe(rename('ng-sort-set.min.js'))
             .pipe(gulp.dest('dist'));
});

gulp.task('default', function () {
  gulp.watch(srcPath, ['lint', 'build']);
});
