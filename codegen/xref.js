'use strict';

var trittext = require('../').allUnicode;
var cp437 = require('./cp437-bitmaps');

// find in CP437 but not trit-text
var unassigned = [];
for (var c in cp437) {
  if (trittext.indexOf(c) === -1) {
    unassigned.push(c);
  }
  //console.log(c, trittext.indexOf(c));
}

// find in trit-text but not CP437
var extra = [];
for (var i in trittext) {
  var c = trittext[i];
  if (!cp437[c]) {
    extra.push(c);
  }
}

console.log('('+unassigned.length+') cp437 - trittext = ');
console.log(unassigned.join(''));
console.log();
console.log('('+extra.length+') trittext - cp437 = ');
console.log(extra);
