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

const stringDecoder = require('string_decoder');

const through = require('through2');

const outlineStroke = require('svg-outline-stroke');

module.exports = function gulpSvgOutlineStroke(options = {}) {
  return through.obj((file, encoding, cb) => {
    if (file.isNull() || file.isDirectory()) {
      return cb(null, file);
    }

    if (file.isBuffer()) {
      updateFileContent(file, options, cb);
    } else if (file.isStream()) {
      updateFileStreamContent(file, options, cb);
    }
  });
};
/**
 * Update SVG content.
 *
 * @param {Object} file SVG file.
 * @param {Object} options Transform options.
 * @param {function} cb The done callback.
 * @return {void}
 */


function updateFileContent(file, options, cb) {
  transform(file.contents.toString(), options).then(output => {
    file.contents = toBuffer(output);
    cb(null, file);
  }).catch(err => {
    cb(err, null);
  });
}
/**
 * A very simple function that transform SVG stream.
 *
 * @param {File} file The original file stream.
 * @param {Object} options Transform options.
 * @param {function} cb The done callback.
 * @return {void}
 */


function updateFileStreamContent(file, options, cb) {
  file.contents = file.contents.pipe(through(function transformFunction(chunk, enc, cb) {
    const decoder = new stringDecoder.StringDecoder();
    const rawChunk = decoder.end(chunk);
    transform(rawChunk, options).then(output => {
      // eslint-disable-next-line no-invalid-this
      this.push(output);
      cb();
    }).catch(err => {
      cb(err, null);
    });
  }));
  cb(null, file);
}
/**
 * Apply svg transformation to given content.
 *
 * @param {string} content SVG Content.
 * @param {Object} options Transform options.
 * @return {Promise} A promise resolved with the resulting transformation.
 */


function transform(content, options = {}) {
  return outlineStroke(content, options);
}
/**
 * Creates a new Buffer containing string.
 *
 * @param {string} rawString The string content.
 * @return {Buffer} Node Buffer.
 */


function toBuffer(rawString) {
  return Buffer.from ? Buffer.from(rawString) : new Buffer(rawString);
}