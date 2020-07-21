/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2020 Mickael Jeanroy
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

'use strict';

const fs = require('fs');
const path = require('path');
const gulp = require('gulp');
const tmp = require('tmp');
const svgOutlineStroke = require('../src/index');

describe('[IT] gulp-svg-outline-stroke', () => {
  let tmpDir;

  beforeEach(() => {
    tmpDir = tmp.dirSync({
      unsafeCleanup: true,
    });
  });

  afterEach(() => {
    tmpDir.removeCallback();
  });

  it('should process svg file', (done) => {
    const fName = 'svg1.svg';
    const src = path.join(__dirname, 'fixtures', fName);
    const dest = path.join(tmpDir.name);

    gulp.src(src)
        .pipe(svgOutlineStroke())
        .pipe(gulp.dest(dest))
        .on('error', (err) => done.fail(err))
        .on('end', () => {
          fs.readFile(path.join(dest, fName), 'utf8', (err, data) => {
            if (err) {
              done.fail(err);
              return;
            }

            /* eslint-disable max-len */
            expect(data).toContain(
                '<path d="M 31 23.500 L 31 31 23.500 31 C 19.167 31, 16 31.422, 16 32 C 16 32.578, 19.167 33, 23.500 33 L 31 33 31 40.500 C 31 44.833, 31.422 48, 32 48 C 32.578 48, 33 44.833, 33 40.500 L 33 33 40.500 33 C 44.833 33, 48 32.578, 48 32 C 48 31.422, 44.833 31, 40.500 31 L 33 31 33 23.500 C 33 19.167, 32.578 16, 32 16 C 31.422 16, 31 19.167, 31 23.500" stroke="none" fill="black" fill-rule="evenodd"/>'
            );
            /* eslint-enable max-len */

            done();
          });
        });
  });
});
