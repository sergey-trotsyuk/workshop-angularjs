import gulp from 'gulp';
import babel from 'gulp-babel';
import concat from 'gulp-concat';
import wrap from 'gulp-wrap';
import sass from 'gulp-sass';
import ngAnnotate from 'gulp-ng-annotate';
import templateCache from 'gulp-angular-templatecache';
import server from 'browser-sync';
import del from 'del';
import path from 'path';
import fs from 'fs';

const babelConfig = JSON.parse(fs.readFileSync('.babelrc'));

const root = 'src/';
const paths = {
    dist: './dist/',
    scripts: [`${root}/app/**/*.js`, `!${root}/app/**/*.spec.js`],
    tests: `${root}/app/**/*.spec.js`,
    styles: `${root}/sass/*.scss`,
    templates: `${root}/app/**/*.html`,
    modules: [
        'angular/angular.js'
    ],
    static: [
        `${root}/index.html`,
        `${root}/fonts/**/*`,
        `${root}/img/**/*`
    ]
};

gulp.task('clean', cb => del(paths.dist + '**/*', cb));

gulp.task('templates', () => {
    return gulp.src(paths.templates)
        .pipe(templateCache({
            root: 'app',
            standalone: true,
            transformUrl: function (url) {
                return url.replace(path.dirname(url), '.');
            }
        }))
        .pipe(gulp.dest('./'));
});

gulp.task('modules', ['templates'], () => {
    return gulp.src(paths.modules.map(item => 'node_modules/' + item))
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest(paths.dist + 'js/'));
});

gulp.task('styles', () => {
    return gulp.src(paths.styles)
        .pipe(sass())
        .pipe(gulp.dest(paths.dist + 'css/'));
});

gulp.task('scripts', ['modules'], () => {
    return gulp.src([
            `!${root}/app/**/*.spec.js`,
            `${root}/app/**/*.module.js`,
            ...paths.scripts,
            './templates.js'
        ])
        .pipe(babel(babelConfig))
        .pipe(wrap('(function(angular){\n<%= contents %>\n})(window.angular);\n\n'))
        .pipe(concat('bundle.js'))
        .pipe(ngAnnotate())
        .pipe(gulp.dest(paths.dist + 'js/'));
});

gulp.task('serve', () => {
    server.create();
    return server.init({
        files: [`${paths.dist}/**`],
        port: 4000,
        server: {
            baseDir: paths.dist
        }
    });
});

gulp.task('copy', ['clean'], () => {
    return gulp.src(paths.static, {base: 'src'})
        .pipe(gulp.dest(paths.dist));
});

gulp.task('watch', ['serve', 'scripts'], () => {
    gulp.watch([paths.scripts, paths.templates], ['scripts']);
    gulp.watch(paths.styles, ['styles']);
});

gulp.task('default', [
    'copy',
    'styles',
    'serve',
    'watch'
]);

gulp.task('build', [
    'copy',
    'styles',
    'scripts'
]);
