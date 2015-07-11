'use strict';

var vkey = require('vkey');
var fromUnicode = require('./utext').fromUnicode;

// map virtual key to Unicode corresponding to trit-text, with modifiers
var _keymap = {
  // vkey: normal, shifted, control, shift-control
  A: ['a', 'A', '', ''],
  B: ['b', 'B', '', ''],
  C: ['c', 'C', '', ''],
  D: ['d', 'D', '', ''],
  E: ['e', 'E', '', ''],
  F: ['f', 'F', '', ''],
  G: ['g', 'G', '', ''],
  H: ['h', 'H', '', ''],
  I: ['i', 'I', '', ''],
  J: ['j', 'J', '', ''],
  K: ['k', 'K', '', ''],
  L: ['l', 'L', '', ''],
  M: ['m', 'M', '', ''],
  N: ['n', 'N', '', ''],
  O: ['o', 'O', '', ''],
  P: ['p', 'P', '', ''],
  Q: ['q', 'Q', '', ''],
  R: ['r', 'R', '', ''],
  S: ['s', 'S', '', ''],
  T: ['t', 'T', '', ''],
  U: ['u', 'U', '', ''],
  V: ['v', 'V', '', ''],
  W: ['w', 'W', '', ''],
  X: ['x', 'X', '', ''],
  Y: ['y', 'Y', '', ''],
  Z: ['z', 'Z', '', ''],

  '`': ['`', '~', '', ''],
  1: ['1', '!', '', ''],
  2: ['2', '@', '', ''],
  3: ['3', '#', '', ''],
  4: ['4', '$', '', ''],
  5: ['5', '%', '', ''],
  6: ['6', '^', '', ''],
  7: ['7', '&', '', ''],
  8: ['8', '*', '', ''],
  9: ['9', '(', '', ''],
  0: ['0', ')', '', ''],
  '-': ['-', '_', '', ''],
  '=': ['=', '+', '', ''],
  '[': ['[', '{', '', ''],
  ']': [']', '}', '', ''],
  '\\': ['\\', '|', '', ''],
  ';': [';', ':', '', ''],
  '\'': ['\\', '"', '', ''],
  ',': [',', '<', '', ''],
  '.': ['.', '>', '', ''],
  '/': ['/', '?', '', ''],

  '<enter>': ['\n', '\n', '', ''],
};

// option-keys to press for shortcuts
var _sc = {};
if(0){//TODO
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
}

function fromEvent(ev) {
  var vkeyChar = vkey[ev.keyCode];

  var flags = (ev.shiftKey ? 1 : 0) + (ev.ctrlKey ? 2 : 0); // TODO: metaKey(cmd)? altKey(opt)?

  var varChars = _keymap[vkeyChar];
  if (!varChars) return null;
  var c = varChars[flags];

  var tt = fromUnicode(c);
  if (tt == null) return null;

  if (ev.metaKey || ev.ctrlKey) tt = -tt; // TODO: other key? option?

  return tt;
}

module.exports = fromEvent;
