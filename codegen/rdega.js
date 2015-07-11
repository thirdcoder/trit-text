'use strict';

require('get-pixels')('ega9x14.png', function(err, pixels) {
  if (err) throw err;
  console.log(pixels+'');

  var cp = 0;
  for(var row=0;row<8;++row) {
    for (var col=0;col<32;++col) {

      var cp = row*32+col;
      var s='-- '+cp+' --\n';

      for (var j=0;j<14;++j) {
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
        s+='\n';
      }
      console.log(s+'\n');
      s='';
    }
  }
});
