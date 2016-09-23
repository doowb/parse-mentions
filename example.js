'use strict';

var url = require('url');
var extend = require('extend-shallow');
var parse = require('./');

var input = `
- @doowb
- @jonschlinkert
`;

console.log('=== LIST OF MENTIONS ===');
console.log(parse(input));
console.log();

console.log('=== LIST OF MENTIONS (stringify = false) ===');
console.log(parse(input, {stringify: false}));
console.log();

console.log('=== REPLACE WITH CUSTOM FUNCTION ===');
console.log(parse(input, replace('https://github.com')));
console.log();

function replace(prefix) {
  return function(name) {
    return `[@${name}](${join(prefix, name)})`;
  };
}

function join(prefix, name) {
  var obj = extend({}, url.parse(prefix), {pathname: name});
  return url.format(obj);
}
