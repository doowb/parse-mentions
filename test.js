'use strict';

require('mocha');
var url = require('url');
var assert = require('assert');
var extend = require('extend-shallow');
var parse = require('./');

var input = '- @doowb\n- @jonschlinkert';

function replace(prefix) {
  return function(name) {
    return `[@${name}](${join(prefix, name)})`;
  };
}

function join(prefix, name) {
  var obj = extend({}, url.parse(prefix), {pathname: name});
  return url.format(obj);
}

describe('parse-mentions', function() {
  it('should export a function', function() {
    assert.equal(typeof parse, 'function');
  });

  it('should throw an error when invalid args are passed', function(cb) {
    try {
      parse();
      cb(new Error('expected an error'));
    } catch (err) {
      assert(err);
      assert.equal(err.message, 'expected first argument to be a string');
      cb();
    }
  });

  it('should return an array of mentions', function() {
    assert.deepEqual(parse(input), ['doowb', 'jonschlinkert']);
  });

  it('should return an array of mentions as objects when stringify is `false`', function() {
    assert.deepEqual(parse(input, {stringify: false}), [
      {name: 'doowb', mention: '@doowb', index: 2},
      {name: 'jonschlinkert', mention: '@jonschlinkert', index: 11}
    ]);
  });

  it('should return string with the mentions replaced using the replace function', function() {
    assert.equal(parse(input, replace('https://github.com')), '- [@doowb](https://github.com/doowb)\n- [@jonschlinkert](https://github.com/jonschlinkert)');
  });

  it('should only parse @ mentions that start with @', function() {
    assert.deepEqual(parse('@one abc @foo @bar.baz one two@qux fex'), ['one', 'foo']);
  });
});
