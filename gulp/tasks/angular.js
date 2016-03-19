var gulp = require('gulp');

var concat = require('gulp-concat');
var gulpif = require('gulp-if');
var minify = require('gulp-uglify');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');

var config = require('../config');

module.exports = function () {
    var moduleSrc = 'app/angular/src/**/*.module.js';
    var specSrc = 'app/angular/src/**/*.spec.js';
    var componentSrc = [
        'app/angular/src/**/*.js',
        '!' + moduleSrc,
        '!' + specSrc
    ];

    gulp.src(moduleSrc)
        .pipe(sourcemaps.init())
            .pipe(concat('angular-modules.js'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('app/angular'));

    gulp.src(componentSrc)
        .pipe(sourcemaps.init())
            .pipe(concat('angular-components.js'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('app/angular'));
};
