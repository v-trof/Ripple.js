var gulp = require('gulp')
var cssnano = require('gulp-cssnano')

gulp.task('min_css', function() {
    gulp.src('./src/*.css')
      .pipe(cssnano())
      .pipe(gulp.dest('./dist'))
})

gulp.task('default', function() {
  gulp.watch('./src/*.css', ['min_css'])
})
