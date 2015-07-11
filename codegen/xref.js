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

/*
console.log('('+unassigned.length+') cp437 - trittext = ');
console.log(unassigned.join(''));
console.log();
console.log('('+extra.length+') trittext - cp437 = ');
console.log(extra);
*/

console.log('module.exports={');
for (var i in trittext) {
  var c = trittext[i];

  var s='';
  var cp = c.charCodeAt(0);
  if(cp===39)s="'\\''";
  else if(cp===0)s="'\\u0000'";
  else if(cp==92)s="'\\\\'";
  else if(cp==10)s="'\\\\n'";
  else s+="'"+c+"'";
  console.log(s+':');

  if (cp437[c]) {
    var lines = cp437[c].split('\n');
    for (var i=0;i<lines.length-1;++i) {
      var line=lines[i];
      console.log("'" + line + "\\n'"+(i==13?',':'+'));
    }
  } else {
    console.log('"", // TODO');
  }
  console.log();
}
console.log('};');

