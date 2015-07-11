'use strict';

var trittext = require('../').allUnicode;
var cp437 = require('./cp437-bitmaps');
for (var c in cp437) {
  console.log(c, trittext.indexOf(c));
}
