#!/usr/bin/env node
// Generate JavaScript object for bitmaps of CP437 characters
// keyed by Unicode character names for easy lookup
//
// node rdega.js > cp437-bitmaps.js
'use strict';

var charnames = []; // map CP437 codepoint to descriptive Unicode character name
var cp437toU=[];
var fs = require('fs');
var csv = fs.readFileSync('cp437.csv','utf8');
var lines = csv.split('\n');
lines.forEach(function(line) {
  var fields = line.split(',');
  var cp437 = parseInt(fields[0], 10);
  var unicode = fields[1];
  var name = fields[2];
  if (cp437!==cp437)return;
  var idname = name.replace(/[^A-Z]/g, '_');
  //console.log(cp437,unicode,idname);
  charnames[cp437] = idname; //+ '_U' + unicode;
  cp437toU[cp437]='U+'+unicode+' '+name;
});
//console.log(charnames);
charnames[0]='NULL'; // http://www.unicode.org/charts/PDF/U0000.pdf doesn't define an official name, says <control>, but suggests this alias
cp437toU[0]='U+0000 NULL';

var bitmaps = {};

require('get-pixels')('ega9x14.png', function(err, pixels) {
  if (err) throw err;
  //console.log(pixels+'');

  console.log('module.exports={');
  var cp = 0;
  for(var row=0;row<8;++row) {
    for (var col=0;col<32;++col) {

      var cp = row*32+col;
      //var s='-- '+cp+charnames[cp]+' --\n';
      var s = '';
      s+='// '+cp437toU[cp]+' (CP437-'+cp+')\n';
      s+=charnames[cp] + ':\n';

      for (var j=0;j<14;++j) {
        s+="'";
        for (var i=0;i<9;++i) {
          var channel = 1; // green, in ega9x14.png this channel is 3 for background, 170 for foreground
          var y = col*9+i, x = row*14+j;
          var pixel = pixels.get(y, x, channel);
          if (pixel===3) {
            s+='.';
            //s+='0';
          } else if (pixel===170) {
            s+='*';
            //s+='1';
          } else {
            throw new Error('unexpected color: '+pixel+' at '+x+','+y);
          }
        }
        s+="'";
        s+=(j==13)?',':'+'
        s+="\n";
      }
      console.log(s);
      s='';
    }
  }
  console.log('};');
});
