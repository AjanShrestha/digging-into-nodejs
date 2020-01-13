#!/usr/bin/env node

'use strict';

var path = require('path');
var fs = require('fs');

var args = require('minimist')(process.argv.slice(2), {
  boolean: ['help'],
  string: ['file'],
});
console.log(args);

if (args.help) {
  printHelp();
} else if (args.file) {
  processFile(path.resolve(args.file));
} else {
  error('Incorrect usage.', true);
}

// **********************

function processFile(filepath) {
  fs.readFile(filepath, function onContents(err, contents) {
    if (err) {
      error(err.toString());
    } else {
      process.stdout.write(contents);
      // console.log(contents);
    }
  });
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
  console.log('');
}
