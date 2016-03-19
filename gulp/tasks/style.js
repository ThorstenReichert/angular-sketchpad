var gulp = require('gulp');

var concat = require('gulp-concat');
var gulpif = require('gulp-if');
var sourcemaps = require('gulp-sourcemaps');

var config = require('../config');

module.exports = function () {
    var styleSrc = 'public/css/src/**/*.css';

    gulp.src(styleSrc)
        .pipe(sourcemaps.init())
            .pipe(concat('style.css'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('public/css'));
};
