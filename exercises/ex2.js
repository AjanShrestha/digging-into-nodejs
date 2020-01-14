#!/usr/bin/env node

'use strict';

var util = require('util');
var path = require('path');
var fs = require('fs');
var Transform = require('stream').Transform;

var getStdin = require('get-stdin');

var args = require('minimist')(process.argv.slice(2), {
  boolean: ['help', 'in'],
  string: ['file'],
});

var BASE_PATH = path.resolve(process.env.BASE_PATH || __dirname);

if (args.help) {
  printHelp();
} else if (args.in || args._.includes('-')) {
  processFile(process.stdin);
} else if (args.file) {
  let stream = fs.createReadStream(path.join(BASE_PATH, args.file));
  processFile(stream);
} else {
  error('Incorrect usage.', true);
}

// **********************

function processFile(inStream) {
  var outStream = inStream;
  var upperStream = new Transform({
    transform(chunk, enc, cb) {
      this.push(chunk.toString().toUpperCase());
      // setTimeout(cb, 500);
      cb();
    },
  });
  outStream = outStream.pipe(upperStream);
  var targetStream = process.stdout;
  outStream.pipe(targetStream);
}

function error(msg, includeHelp = false) {
  console.error(msg);
  if (includeHelp) {
    console.log('');
    printHelp();
  }
}

function printHelp() {
  console.log('ex1 usage:');
  console.log(' ex1.js --file={FILENAME}');
  console.log('');
  console.log('--help                 print this help');
  console.log('--file={FILENAME}      process the file');
  console.log('--in, -                process stdin');
  console.log('');
}
