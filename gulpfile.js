const gulp = require('gulp')
const babel = require('gulp-babel')
const nodemon = require('gulp-nodemon')

const paths = ['./**/*.js', '!dist/**', '!node_modules/**']

let build = () => {
  return gulp
    .src(paths)
    .pipe(babel({}))
    .pipe(gulp.dest('dist'))
}

let watcher = (done) => {
  let stream = nodemon({
    script: 'dist/index.js',
    ext: 'js',
    ignore: ['node_modules/**/*.js', 'dist/**/*.js'],
    tasks: ['build'],
    done: done
  })

  // Restart if app crashes
  stream
    .on('crash', () => {
      console.log('Application crashed!')
      stream.emit('restart', 10)
    })

}

module.exports = {
  build,
  default: gulp.series(build, watcher)
}

