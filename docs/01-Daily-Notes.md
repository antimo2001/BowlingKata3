# 01-Daily-Notes.md

## 2019-03-09

### todo for 2019-03-09 02:14:57

- [x] initialize project folder (`npm init`, `git init`)
- [x] npm install all the things
  - [x] (`npm i --save body-parser  cors  express  express-jwt  express-pino-logger  express-validation`)
  - [x] (`npm i --save  helmet  joi  jsonwebtoken  latest  lodash  moment  moment-timezone`)
  - [x] (`npm i --save  mongo mongoclient  mongodb  pino`)
  - [x] (`npm i --save  web3-utils  websocket`)
  - [x] (`npm i --save-dev  @babel/core  @babel/preset-env  gulp  gulp-babel gulp-nodemon`)

### issues on 2019-03-09 03:17:13

npm install fails for `web3` ...need set my PYTHON_HOME or need to research which version of python to install

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

### Requirements and Specifications for BowlingKata3 Restful API

- mount path should be `/api/v0`
- entities are User, Player, Game
- Services are `/users`, `/players`, `/games`

#### Specs for /users

- actions: create user, list users, authenticate user

### TIL about Barreling; [see online gitbook here](https://basarat.gitbooks.io/typescript/docs/tips/barrel.html)

A barrel is a way to rollup exports from several modules into a single convenient module. The barrel itself is a module file that re-exports selected exports of other modules.

## 2019-03-14

### daily logs for 2019-03-14 21:40:17

- [x] research how to install web3 and its prerequisites (`npm i --save  web3`) ...nvm; don't care about installing all the prerequisites like Python 2.x and Dotnet Framework 2.0 and w/e fubar crap
- [x] practice Promise.all and make sure babel v7 can use it or not?

### intial data model design is like this

```js
const USER_SEED_DATA = [
  {
    "user":{
      "_id": number,
      "username": string,
      "secret": hexstring,
      "email": string,
      "firstName": string,
      "lastName": string
    },
    "digitalId": string,
  }
]

// Game is in relationship <*, *> with Player
const GAME_SEED_DATA = [
  {
    "_id": number,
    "type": string = "notype",
    "scores": number[],
    "players": [{ "playerId": hexstring }],
  }
]

// User is in relationship <1, 1> with Player
const PLAYER_SEED_DATA = [
  {
    "playerId": number,
    "userId": number,
    "displayname": string,
    "games": [{ "gameId": hexstring }],
  }
]

```

## 2019-03-21

## daily logs for 2019-03-21 06:01:52

- [x] practice mongoose (started on userModel)
- [ ] practice seed mongodb; use csv parser

## 2019-03-NN

## 2019-MM-DDD