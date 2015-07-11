'use strict';

var _vtext = require('./vtext');
var toUnicode = require('./utext').toUnicode;
var fromUnicode = require('./utext').fromUnicode;
var isInverted = require('./utext').isInverted;
var allUnicode = require('./utext').allUnicode;
var fromEvent = require('./etext');

function toTritmap(n) {
  var inverted = isInverted(n);
  var unicode = toUnicode(n);
  if (unicode === undefined) throw new Error('no character for trit-text codepoint:'+n);
  var vtext = _vtext[unicode];
  if (!vtext) throw new Error('no tritmap for character: '+n);

  var tritmap = '';

  for (var i = 0; i < vtext.length; ++i) {
    // for source code readability, the tritmap is stored encoded TODO: store converted if too slow
    switch(vtext.charAt(i)) {
      case '\n':
        break;
      case '.':
        tritmap += '0';
        break;
      case '*':
        tritmap += inverted ? 'i' : '1';
        break;
      default:
        throw new Error('invalid vtext data for tritmap character '+n+': '+vtext.charAt(i));
      }
  }

  return tritmap;
}

module.exports = {
  toUnicode: toUnicode,
  isInverted: isInverted,
  fromUnicode: fromUnicode,
  fromEvent: fromEvent,
  allUnicode: allUnicode,
  toTritmap9x14: toTritmap,
};
