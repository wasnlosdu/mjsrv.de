var gulp = require('gulp'),
    gutil = require('gulp-util'),
    imagemin = require('gulp-imagemin'),
    useref = require('gulp-useref'),
    jshint = require('gulp-jshint'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),

    input = {
        'html': 'source/*.html',
        'images': 'source/assets/images/**/*.*',
        'sass': 'source/assets/scss/**/*.scss',
        'javascript': 'source/assets/javascript/**/*.js',
        'vendorjs': 'public/assets/javascript/vendor/**/*.js'
    },

    output = {
        'html': 'public',
        'stylesheets': 'public/assets/stylesheets',
        'javascript': 'public/assets/javascript',
        'images': 'public/assets/images'
    };

/* run the watch task when gulp is called without arguments */
gulp.task('default', ['watch']);

/* run javascript through jshint */
gulp.task('jshint', function () {
    return gulp.src(input.javascript)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

/* compile scss files */
gulp.task('build-css', function () {
    return gulp.src('source/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(output.stylesheets));
    gulp.src(input.html)
        .pipe(useref())
        .pipe(gulp.dest(output.html));
});

/* concat javascript files, minify if --type production */
gulp.task('build-js', function () {
    return gulp.src(input.javascript)
        .pipe(sourcemaps.init())
        .pipe(concat('bundle.js'))
        //only uglify if gulp is ran with '--type production'
        .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(output.javascript));
});
gulp.task('image-opt', function () {
    gulp.src(input.images)
        .pipe(imagemin())
        .pipe(gulp.dest(output.images))
});
gulp.task('copy-html', function () {
    return gulp.src(input.html)
        .pipe(useref())
        .pipe(gulp.dest(output.html));
});

/* Watch these files for changes and run the task on update */
gulp.task('watch', function () {
    gulp.watch(input.javascript, ['jshint', 'build-js']);
    gulp.watch(input.sass, ['build-css']);

    gulp.watch(input.html, ['copy-html']);
});
