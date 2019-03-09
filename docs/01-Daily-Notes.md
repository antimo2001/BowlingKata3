# 01-Daily-Notes.md

## 2019-03-09

### todo for 2019-03-09 02:14:57

- [ ] initialize project folder (`npm init`, `git init`)
- [ ] npm install all the things
  - [ ] (`npm i body-parser  cors  express  express-jwt  express-pino-logger  express-validation)
  - [ ] (`npm i  helmet  joi  jsonwebtoken  latest  lodash  moment  moment-timezone)
  - [ ] (`npm i  mongo mongoclient  mongodb  pino  web3  web3-utils  websocket`)
  - [ ] (`npm i --save-dev  @babel/core  @babel/preset-env  gulp  gulp-babel gulp-nodemon`)

```js
/// gulpfile.js

const gulp = require('gulp')
const babel = require('gulp-babel')
const nodemon = require('gulp-nodemon')

const paths = ['./**/*.js', '!dist/**', '!node_modules/**']

let build = () => {
  return gulp
    .src(paths)
    .pipe(babel())
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

/// End of gulpfile.js

```


## 2019-MM-DD

## 2019-MM-DDD