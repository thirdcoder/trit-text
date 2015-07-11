'use strict';

var vkey = require('vkey');
var fromUnicode = require('./utext').fromUnicode;

// map virtual key to Unicode corresponding to trit-text, with modifiers
var _keymap = {
  // vkey: normal, shifted, control, shift-control
  A: ['a', 'A', '☺', ''],
  B: ['b', 'B', '☻', ''],
  C: ['c', 'C', '♥', ''],
  D: ['d', 'D', '♦', ''],
  E: ['e', 'E', '•', ''],
  F: ['f', 'F', '◘', ''],
  G: ['g', 'G', '○', ''],
  H: ['h', 'H', '◙', ''],
  I: ['i', 'I', '♂', ''],
  J: ['j', 'J', '♀', ''],
  K: ['k', 'K', '☼', ''],
  L: ['l', 'L', '▒', ''],
  M: ['m', 'M', '←', ''],
  N: ['n', 'N', '→', ''],
  O: ['o', 'O', '↑', ''],
  P: ['p', 'P', '↓', ''],
  Q: ['q', 'Q', '◄', ''],
  R: ['r', 'R', '►', ''],
  S: ['s', 'S', '', ''],
  T: ['t', 'T', '', ''],
  U: ['u', 'U', '', ''],
  V: ['v', 'V', '', ''],
  W: ['w', 'W', '', ''],
  X: ['x', 'X', '≈', ''],
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
  '-': ['-', '_', '‾', ''],
  '=': ['=', '+', '±', '∓'],
  '[': ['[', '{', '', ''],
  ']': [']', '}', '', ''],
  '\\': ['\\', '|', '', ''],
  ';': [';', ':', '', ''],
  '\'': ['\\', '"', '', ''],
  ',': [',', '<', '', ''],
  '.': ['.', '>', '', ''],
  '/': ['/', '?', '', ''],

  '<escape>': ['⌂', '⌂', '', ''],
  '<enter>': ['\n', '\n', '', ''],
  '<space>': [' ', '\u0000', ' ', ' '],
};

function fromEvent(ev) {
  var vkeyChar = vkey[ev.keyCode];

  var flags = (ev.shiftKey ? 1 : 0) + (ev.ctrlKey ? 2 : 0); // TODO: metaKey(cmd)? altKey(opt)?

  var varChars = _keymap[vkeyChar];
  if (!varChars) return null;

  if (varChars[flags] === '' && flags === 3) flags = 2; // no shift-control variant, try control
  if (varChars[flags] === '' && flags === 2) flags = 0; // no control variant, try normal

  var c = varChars[flags];

  var tt = fromUnicode(c);
  if (tt == null) return null;

  if (ev.altKey) tt = -tt; // alt/option key inverts

  return tt;
}

module.exports = fromEvent;
