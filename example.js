'use strict';

var url = require('url');
var parse = require('./');

var input = 'Foo @doowb bar @jonschlinkert;';

console.log('=== LIST OF MENTIONS ===');
console.log(parse(input));
console.log();

console.log('=== CUSTOM TRANSFORM FUNCTION ===');
console.log(parse(input, transform('https://github.com')));
console.log();

console.log('=== CUSTOM REPLACEMENT FUNCTION ===');
console.log(parse(input, replace('https://github.com')));
console.log();

function transform(prefix) {
  return function(tok) {
    return `[@${tok.name}](${url.resolve(prefix, tok.name)})`;
  };
}

function replace(prefix) {
  return function(tok, tokens) {
    var val = `[@${tok.name}](${url.resolve(prefix, tok.name)})`;
    tokens.output = tokens.output.slice(0, tok.match.index) + val
      + tokens.output.slice(tok.match.index + tok.match[0].length);
    return val;
  };
}
