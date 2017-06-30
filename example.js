'use strict';

var url = require('url');
var parse = require('./');

var input = 'Foo @doowb bar @jonschlinkert;';

console.log('=== LIST OF MENTIONS ===');
console.log(parse(input));
console.log();

console.log('=== CUSTOM TRANSFORM FUNCTION ===');
console.log(parse(input, replace('https://github.com')));
console.log();

function replace(prefix) {
  return function(tok) {
    return `[@${tok.name}](${url.resolve(prefix, tok.name)})`;
  };
}
