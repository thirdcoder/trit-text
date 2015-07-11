'use strict';

var OPT = require('./optkeys');
var fromUnicode = require('./').fromUnicode;

// option-keys to press for shortcuts
var _sc = {};
_sc[OPT.A] = '☺'; _sc[OPT.B] = '☻';
_sc[OPT.C] = '♥'; _sc[OPT.D] = '♦';
/*_sc[OPT.E] = '♣'*/; _sc[OPT.F] = '♠';
_sc[OPT.G] = '•'; _sc[OPT.H] = '◘';
/*_sc[OPT.I] = '○'*/; _sc[OPT.J] = '◙';
_sc[OPT.K] = '♂'; _sc[OPT.L] = '♀';
_sc[OPT.M] = '☼'; /*_sc[OPT.N] = '▒';*/
_sc[OPT.O] = '←'; _sc[OPT.P] = '→';
_sc[OPT.Q] = '↑'; _sc[OPT.R] = '↓';
_sc[OPT.S] = '◄'; _sc[OPT.T] = '►';
/*_sc[OPT.U] = '▲';*/ _sc[OPT.V] = '▼';

function fromEvent(ev) {
  // TODO: use only keyCode, keydown event instead of keypress?
  if (ev.keyCode === 13) { // ASCII carriage return, enter/newline
    return 12; // trit-text newline
  }

  var c = ev.charCode;

  if (_sc[c] !== undefined) {
    c = _sc[c];
  }

  var tt = fromUnicode(c);
  if (tt == null) return null;

  if (ev.metaKey || ev.ctrlKey) tt = -tt; // TODO: other key? option?

  return tt;
}

module.exports = fromEvent;
