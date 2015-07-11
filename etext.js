'use strict';

var OPT = require('./optkeys');
var fromUnicode = require('./').fromUnicode;

var _shortcuts = {
  // option-keys to press for shortcuts
  OPT.A: '☺', OPT.B: '☻',
  OPT.C: '♥', OPT.D: '♦',
  /*OPT.E: '♣'*/, OPT.F: '♠',
  OPT.G: '•', OPT.H: '◘',
  /*OPT.I: '○'*/, OPT.J: '◙',
  OPT.K: '♂', OPT.L: '♀',
  OPT.M: '☼', /*OPT.N: '▒',*/
  OPT.O: '←', OPT.P: '→',
  OPT.Q: '↑', OPT.R: '↓',
  OPT.S: '◄', OPT.T: '►',
  /*OPT.U: '▲',*/ OPT.V: '▼',
};

function fromEvent(ev) {
  // TODO: use only keyCode, keydown event instead of keypress?
  if (ev.keyCode === 13) { // ASCII carriage return, enter/newline
    return 12; // trit-text newline
  }

  var c = ev.charCode;

  if (_shortcuts[c] !== undefined) {
    c = _shortcuts[c];
  }

  var tt = fromUnicode(c);
  if (tt == null) return null;

  if (ev.metaKey || ev.ctrlKey) tt = -tt; // TODO: other key? option?

  return tt;
}

module.exports = fromEvent;
