'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    watch = require('gulp-watch'),
    autoprefixer = require('gulp-autoprefixer'),
    livereload = require('gulp-livereload'),
    connect = require('gulp-connect');

function conn(cb) {
  connect.server({
    root: '',
    livereload: true
  });
  cb();
}

function styles(cb) {
  gulp.src('./sass/*.scss')
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(gulp.dest('./css'))
    .pipe(connect.reload());
  cb();
}

function html(cb) {
  gulp.src('./*.html')
    .pipe(connect.reload());
  cb();
}

function scripts(cb) {
  gulp.src('./js/*.js')
    .pipe(connect.reload());
  cb();
}

gulp.task('watch', function(){
  gulp.watch('sass/*.scss', styles);
  gulp.watch('*.html', html);
  gulp.watch('js/*.js', scripts);
});

gulp.task('default', gulp.parallel([conn, html, scripts, styles, 'watch']));
