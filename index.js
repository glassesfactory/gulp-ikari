'use strict';
var through = require('through2');

module.exports = function(opts) {
  return through.obj(function(file, enc, cb) {
    if(file.isNull()){
      return cb(null, file);
    }

    if (file.isStream()) {
      return callback(createError(file, 'Streaming not supported'));
    }

    var originalContents = String(file.contents);
    var tgt = "module.exports = '" + originalContents.replace(/([\n\r]+[\s]+|[\n\r]+)/g, "") + "'";
    file.contents = new Buffer(tgt);
    cb(null, file);
    // if (typeof opts === 'function') {
    //   var res = opts.call(this, file)
    //   if (res != null) {
    //     file.named = res
    //     this.queue(file)
    //   }
    // } else {
    //   file.named = path.basename(file.path, path.extname(file.path))
    //   this.queue(file)
    // }
  });
}
