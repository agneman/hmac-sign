# Node.js HMAC signer/verifier

Simple Node.js utility to sign and verify data using HMAC signatures.

## Installation

1. Make sure Node.js and npm is installed (https://nodejs.org)

2. Run `npm install -g hmac-sign` with superuser permissions

## Usage

Sign a file

`hmac-sign <key file> <file>`

Verify a signature

`hmac-sign -v <signature file> <key file> <file>`
