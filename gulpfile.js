var gulp = require('gulp');
var sass = require('gulp-sass');
var sassJspm = require('sass-jspm-importer');
var rename = require('gulp-rename');

gulp.task('build-index', function () {
    return gulp.src('index-stage.html')
        .pipe(rename('index.html'))
        .pipe(gulp.dest('build'));

});

gulp.task('add-reflect', function () {
    return gulp.src(['node_modules/reflect-metadata/Reflect.js', 'node_modules/reflect-metadata/Reflect.js.map'])
        .pipe(gulp.dest('build'));
});

gulp.task('build-fonts', function () {
    return gulp.src('app/styles/fonts/*.*')
        .pipe(gulp.dest('build/app/styles/fonts'));
});

gulp.task('build-images', function () {
    return gulp.src('app/styles/img/*.*')
        .pipe(gulp.dest('build/app/styles/img'));
});

gulp.task('build-assets', ['add-reflect', 'build-index', 'build-fonts', 'build-images'], function() {
    return gulp.src(['app/styles/main.scss'])
        .pipe(sass({
            errLogToConsole: true,
            functions: sassJspm.resolve_function('/app/jspm_packages/'),
            importer: sassJspm.importer
        }))
        .pipe(gulp.dest('build/css'));
});