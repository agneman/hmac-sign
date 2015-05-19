#!/usr/bin/env node

var argv = require("minimist")(process.argv.slice(2));
var fs = require("fs");
var Signer = require("./Signer");

var signature_file_name = argv["v"];
var key_file_name = argv["_"][0];
var file_name = argv["_"][1];

var READ_FILE_OPTS = {encoding: "utf8"};
var HASH_ALGORITHM = "sha256";

if (require.main === module) {

  if (!key_file_name || !file_name) {
    console.log("Usage: hmac-sign [-v <signature>] <key> <file>");
    process.exit(1);
  }

  function verify (signer, file, signature_file_name) {
    fs.readFile(signature_file_name, READ_FILE_OPTS, function (err, data) {
      signer.verify(file, data.trim(), function (is_valid) {
        if (!is_valid) {
          console.log("Incorrect signature.");
          process.exit(2);
        }
        console.log("Correct signature.");
      });
    });
  }

  fs.readFile(key_file_name, READ_FILE_OPTS, function (err, data) {
    if (err)
      throw err;
    var signerObj = new Signer(data, HASH_ALGORITHM);
    var file = fs.createReadStream(file_name);
    if (signature_file_name) {
      verify(signerObj, file, signature_file_name);
    }
    else {
      signerObj.sign(file, function (hmac) {
        console.log(hmac);
      });
    }
  });
}
