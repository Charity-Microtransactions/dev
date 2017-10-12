const gulp = require("gulp")
const babel = require("gulp-babel")
const notify = require("gulp-notify")
const del = require("del");
const exec = require('child_process').exec;


const paths = {
  html:{src:"src/**/*.html", dest:"build"},
  js:{src:"src/**/*.js",dest:"build"},
  babel:{src:"src/**/*.babel",dest:"build"}
};

const babelOpts = {
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

gulp.task("start", ['src','compile'], () => {
  exec("npm start");
  notify("started server");
});
gulp.task("clean", clean);
gulp.task('compile', ['clean','src'], compile);
gulp.task('src',['clean'], src);
gulp.task('watch',['compile','src'], watch);
gulp.task('default', ['clean','watch', 'start']);
