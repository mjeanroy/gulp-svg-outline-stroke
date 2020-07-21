# gulp-svg-outline-stroke

[![Greenkeeper badge](https://badges.greenkeeper.io/mjeanroy/gulp-svg-outline-stroke.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.org/mjeanroy/gulp-svg-outline-stroke.svg?branch=master)](https://travis-ci.org/mjeanroy/gulp-svg-outline-stroke)
[![Npm version](https://badge.fury.io/js/gulp-svg-outline-stroke.svg)](https://badge.fury.io/js/gulp-svg-outline-stroke)

gulp-svg-outline-stroke is a [Gulp](https://github.com/gulpjs/gulp) extension for [https://www.npmjs.com/package/gulp-svg-outline-stroke](svg-outline-stroke).

## Install

`npm install --save-dev gulp-svg-outline-stroke`

## Usage

```javascript
const outlineStroke = require('gulp-svg-outline-stroke');

gulp.src('**/*.svg')
  .pipe(outlineStroke())
  .pipe(gulp.dest('./dist/'))
```


## ChangeLogs

See [here](https://github.com/mjeanroy/gulp-svg-outline-stroke/blob/master/CHANGELOG.md).

## License

MIT License (MIT)

## Contributing

If you find a bug or think about enhancement, feel free to contribute and submit an issue or a pull request.
