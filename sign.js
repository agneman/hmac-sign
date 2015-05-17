var argv = require('minimist')(process.argv.slice(2));
var fs = require('fs');
var Signer = require('./Signer');

var signature_file_name = argv['v'];
var key_file_name = argv['_'][0];
var file_name = argv['_'][1];

var READ_FILE_OPTS = {encoding: 'utf8'};
var HASH_ALGORITHM = 'sha256';

function compare_hmac_from_file(file_name, hmac) {
  fs.readFile(file_name, READ_FILE_OPTS, function (err, data) {
    if (data.trim() == hmac) {
      console.log("Signature correct.");
    }
    else {
      console.log("Incorrect signature.");
      process.exit(1);
    }
  });
}

if (!key_file_name || !file_name) {
  console.log("Usage: node sign.js [-v <signature>] <key> <file>");
  process.exit(1);
}

fs.readFile(key_file_name, READ_FILE_OPTS, function (err, data) {
  if (err)
    throw err;
  var SignerObj = new Signer(data, HASH_ALGORITHM);
  var file = fs.createReadStream(file_name);
  SignerObj.sign(file, function(hmac) {
    if (signature_file_name) {
      compare_hmac_from_file(signature_file_name, hmac);
    }
    else {
      console.log(hmac);
    }
  });
});
