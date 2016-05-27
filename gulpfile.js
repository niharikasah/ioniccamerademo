var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var gettext = require('gulp-angular-gettext');
var pojson = require('gulp-po-json');
var jsonEditor = require('gulp-json-editor');
var rename = require('gulp-rename');
var sh = require('shelljs');

var paths = {
    sass: ['./scss/**/*.scss']
};

gulp.task('pot', function () {
    return gulp.src(['./www/partials/*.html', '.www/js/*.js'])
            .pipe(gettext.extract('template.pot', {
                // options to pass to angular-gettext-tools... 
            }))
            .pipe(gulp.dest('./www/po/'));
});
gulp.task('translations', function () {
    return gulp.src('./www/po/*.po')
            .pipe(gettext.compile({
                // options to pass to angular-gettext-tools... 
                format: 'json'
            }))
            .pipe(gulp.dest('./www/dist/translations/'));
});

gulp.task('translate', function () {
    return gulp.src('./www/po/*.po')
            .pipe(pojson())
            .pipe(jsonEditor(function (json) {
                var ret = {},
                        key,
                        keySplit;
                for (key in json.dic) {
                    keySplit = key.split('.');
                    if (!ret[keySplit[0]]) {
                        ret[keySplit[0]] = {};
                    }
                    ret[keySplit[0]][keySplit[1]] = (json.dic[key]) ? json.dic[key] : '';
                }
                return ret;
            }))
            .pipe(gulp.dest('./www/build/locales/'));
});
gulp.task('default', ['sass']);

gulp.task('sass', function (done) {
    gulp.src('./scss/ionic.app.scss')
            .pipe(sass())
            .on('error', sass.logError)
            .pipe(gulp.dest('./www/css/'))
            .pipe(minifyCss({
                keepSpecialComments: 0
            }))
            .pipe(rename({extname: '.min.css'}))
            .pipe(gulp.dest('./www/css/'))
            .on('end', done);
});

gulp.task('watch', function () {
    gulp.watch(paths.sass, ['sass']);
});

gulp.task('install', ['git-check'], function () {
    return bower.commands.install()
            .on('log', function (data) {
                gutil.log('bower', gutil.colors.cyan(data.id), data.message);
            });
});

gulp.task('git-check', function (done) {
    if (!sh.which('git')) {
        console.log(
                '  ' + gutil.colors.red('Git is not installed.'),
                '\n  Git, the version control system, is required to download Ionic.',
                '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
                '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
                );
        process.exit(1);
    }
    done();
});
