var crypto = require('crypto');


var Signer = function (key, algorithm) {
  this.key = key;
  this.algorithm = algorithm;
}

Signer.prototype.sign = function (stream, callback) {
  sign(this.key, this.algorithm, stream, callback);
}

Signer.prototype.verify = function (stream, hmac, callback) {
  verify(this.key, this.algorithm, stream, hmac, callback);
}

function sign (key, algorithm, stream, callback) {
  var hmac = crypto.createHmac(algorithm, key);
  hmac.setEncoding('hex');
  stream.pipe(hmac);
  stream.on('end', function() {
    callback(hmac.read());
  });
}

function verify (key, algorithm, stream, hmac, callback) {
  sign(key, algorithm, stream, function (calculated_hmac) {
    callback(calculated_hmac == hmac);
  });
}

module.exports = Signer;
