'use strict';

var test = require('tape');
var toUnicode = require('./').toUnicode;
var fromUnicode = require('./').fromUnicode;
var isInverted = require('./').isInverted;

test('to/from a', function(t) {
  t.equal(toUnicode(42), 'a');
  t.equal(fromUnicode('a'), 42);
  t.end();
});

test('inverted', function(t) {

  t.equal(toUnicode(42), 'a');
  t.equal(toUnicode(-42), 'a');

  t.equal(isInverted(42), false);
  t.equal(isInverted(-42), true);

  t.end();
});
