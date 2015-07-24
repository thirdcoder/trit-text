# trit-text

A 5-trit text format, analogous to 7-bit ASCII

[![Build Status](https://travis-ci.org/thirdcoder/trit-text.svg?branch=master)](https://travis-ci.org/thirdcoder/trit-text)
[![npm version](https://badge.fury.io/js/trit-text.svg)](https://www.npmjs.com/package/trit-text)

Usage:

    var toUnicode = require('trit-text').toUnicode;
    var isInverted = require('trit-text').isInverted;
    var fromUnicode = require('trit-text').fromUnicode;
    var fromEvent = require('trit-text').fromEvent;
    var allUnicode = require('trit-text').allUnicode;
    var toTritmap9x14 = require('trit-text').toTritmap9x14;

The trit-text codepoints range from -121 to +121, comparable to ASCII 0 to 127.

`to/fromUnicode` converts between Unicode and trit-text, and isInverted returns whether the
character is "inverted"/emphasized (that is, -121 to -1; normal characters are 1 to 121):

    toUnicode(42);      // 'a'
    fromUnicode('a');   // 42
    isInverted(42);     // false
    isInverted(-42);    // true

`fromEvent(ev)` takes a DOM keydown event and returns a representative trit-text character codepoint.

`toTritmap9x14(cp)` returns a 9x14 tritmap (analogous to bitmap) to graphically represent the given character.

Codepoint reference:

    +1 to +121 normal text (ex: black on white, green on black)
    -1 to -121 inverted/emphasized (ex: reverse video white on black, red on black)

    control/digits
    00000 = 0       NUL   null, string terminator, only unbalanced; in serial mode zero-width, matrix mode alternating flashing normal/inverted
    00001 = 1       1
    0001i = 2       2
    00010 = 3       3
    00011 = 4       4
    001ii = 5       5
    001i0 = 6       6
    001i1 = 7       7
    0010i = 8       8
    00100 = 9       9
    00101 = 10      0
    0011i = 11      ESC escape/reserved code, visual representation: ⌂ U+2302 house
    00110 = 12      NL  newline, \n, linefeed, visual representation: ♪ U+266a eighth note
    00111 = 13      SP  space

        (01xxx=left, pairs with 10xxx=right, and control(1i)=01, shift-control(11)=10)
    left punctuation                                        right punctuation                                           
    01iii = 14  @                                           10iii = 68  `
    01ii0 = 15  ☺ U+263A smiley                             10ii0 = 69  ☻ U+263B inverted smiley
    01ii1 = 16  ♥ U+2665 hearts                             10ii1 = 70  ♦ U+2666 diamonds
    01i0i = 17  ♣ U+2663 clubs                              10i0i = 71  ♠ U+2660 spades
    01i00 = 18  • U+2022 bullet                             10i00 = 72  ◘ U+25D8 inverted bullet
    01i01 = 19  ○ U+25CB circle                             10i01 = 73  ◙ U+25D9 inverted circle
    01i1i = 20  ♂ U+2642 male                               10i1i = 74  ♀ U+2640 female
    01i10 = 21  ☼ U+263C solar                              10i10 = 75  ▒ U+2592 medium shade
    01i11 = 22  ← U+2190 left arrow                         10i11 = 76  → U+2192 right arrow
    010ii = 23  ↑ U+2191 up arrow                           100ii = 77  ↓ U+2193 down arrow
    010i0 = 24  « U+00AB left-pointing double angle quot    100i0 = 78  » U+00BB right-pointing double angle quot
    010i1 = 25  ± U+00B1 plus-minus sign                    100i1 = 79  ∓ U+2213 minus-or-plus sign
    0100i = 26  (                                           1000i = 80  )                                              
    01000 = 27  [                                           10000 = 81  ]
    01001 = 28  <                                           10001 = 82  >
    0101i = 29  {                                           1001i = 83  }
    01010 = 30  \                                           10010 = 84  /
    01011 = 31  .                                           10011 = 85  ,
    011ii = 32  ;                                           101ii = 86  :
    011i0 = 33  '                                           101i0 = 87  "
    011i1 = 34  !                                           101i1 = 88  ?
    0110i = 35  #                                           1010i = 89  $
    01100 = 36  %                                           10100 = 90  &
    01101 = 37  -                                           10101 = 91  +
    0111i = 38  *                                           1011i = 92  |
    01110 = 39  =                                           10110 = 93  ≈ U+2248 approximately equal
    01111 = 40  ^                                           10111 = 94  ~
                                                                
     (1cxxxx = letters, where c=case, i=lower, 1=upper - toggle 2nd mst i=lowercase,1=uppercase (includes _ and ‾, allow in program identifiers)
    lowercase letters                                       uppercase letters
    1iiii = 41 ‾ U+203E overline (standalone)               11iii = 95   _ underline
    1iii0 = 42 a                                            11ii0 = 96   A
    1iii1 = 43 b                                            11ii1 = 97   B
    1ii0i = 44 c                                            11i0i = 98   C
    1ii00 = 45 d                                            11i00 = 99   D
    1ii01 = 46 e                                            11i01 = 100  E
    1ii1i = 47 f                                            11i1i = 101  F
    1ii10 = 48 g                                            11i10 = 102  G
    1ii11 = 49 h                                            11i11 = 103  H
    1i0ii = 50 i                                            110ii = 104  I
    1i0i0 = 51 j                                            110i0 = 105  J
    1i0i1 = 52 k                                            110i1 = 106  K
    1i00i = 53 l                                            1100i = 107  L
    1i000 = 54 m                                            11000 = 108  M
    1i001 = 55 n                                            11001 = 109  N
    1i01i = 56 o                                            1101i = 110  O
    1i010 = 57 p                                            11010 = 111  P
    1i011 = 58 q                                            11011 = 112  Q
    1i1ii = 59 r                                            111ii = 113  R
    1i1i0 = 60 s                                            111i0 = 114  S
    1i1i1 = 61 t                                            111i1 = 115  T
    1i10i = 62 u                                            1110i = 116  U
    1i100 = 63 v                                            11100 = 117  V 
    1i101 = 64 w                                            11101 = 118  W
    1i11i = 65 x                                            1111i = 119  X
    1i110 = 66 y                                            11110 = 120  Y
    1i111 = 67 z                                            11111 = 121  Z

Codepoints above are shown in decimal and [balanced-ternary](https://github.com/thirdcoder/balanced-ternary).
Some characters above are inspired by the [CP437](https://en.wikipedia.org/wiki/Code_page_437) character set,
and the [IBM PC EGA 9x14 bitmap font](http://nerdlypleasures.blogspot.dk/2015/04/ibm-character-fonts.html).
