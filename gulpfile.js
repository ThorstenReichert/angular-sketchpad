var gulp = require('./gulp')([
    'angular',
    'style'
]);
var watch = require('gulp-watch');

gulp.task('build', ['angular', 'style']);

gulp.task('watch', function () {
    gulp.watch('./app/angular/src/**/*', ['angular']);
});

gulp.task('default', ['build', 'watch']);
