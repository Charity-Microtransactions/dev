const gulp = require("gulp")
const babel = require("gulp-babel")
const notify = require("gulp-notify")
const del = require("del");
const nodemon = require("gulp-nodemon")
const webpack = require("gulp-webpack")

const paths = {
  html:{src:"src/**/*.html", dest:"build"},
  js:{src:"src/**/*.js",dest:"build"},
  babel:{src:"src/**/*.babel",dest:"build"}
};

const babelOpts = {
  env:{
    "es6": true
  },
  plugins:["transform-react-jsx"]
}

const clean = () => del(["build/**/*.*"]);

const src = ()=>
  gulp.src([paths.html.src,paths.js.src])
    .pipe(gulp.dest(paths.html.dest))

const compile = ()=>
  gulp.src(paths.babel.src)
    .pipe(babel(babelOpts).on('error', notify.onError(err => err.message)))
    .pipe(gulp.dest(paths.babel.dest))


const watch = () => gulp.watch([paths.js.src, paths.babel.src], ['clean','src','compile','start']);

const clientjs = "build/service/site/client.js";
const bundlejs = "service/site/bundle.js";
gulp.task("webpack", ['src', 'compile'], () =>
  gulp.src(clientjs)
    .pipe(webpack({
      output:{
        filename:bundlejs}}))
    .pipe(gulp.dest("build"))
)

gulp.task("start", ['src','compile', 'webpack'], nodemon);
gulp.task("clean", clean);
gulp.task('compile', ['clean','src'], compile);
gulp.task('src',['clean'], src);
gulp.task('watch',['compile','src'], watch);
gulp.task('default', ['clean','watch', 'start']);
