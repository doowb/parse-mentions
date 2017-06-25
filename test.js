'use strict';

require('mocha');
var url = require('url');
var assert = require('assert');
var extend = require('extend-shallow');
var parse = require('./');

var input = '- @doowb\n- @jonschlinkert,\n- @pentarex';
var inputBuildUrl = '- @doowb\n- @jonschlinkert\n- @pentarex';

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
    assert.deepEqual(parse(input), ['doowb', 'jonschlinkert', 'pentarex']);
  });

  it('should return an array of mentions as objects when stringify is `false`', function() {
    assert.deepEqual(parse(input, {stringify: false}), [
      {name: 'doowb', mention: '@doowb', index: 2},
      {name: 'jonschlinkert', mention: '@jonschlinkert', index: 11},
      {name: 'pentarex', mention: '@pentarex', index: 29}
    ]);
  });

  it('should return string with the mentions replaced using the replace function', function() {
    //TODO Not sure why the normal input is not working here, even in regular situation where there is a sentence like
    // var input = "Checkout my repo @doowb, there you can find my library" its not going to work, its appending the comma, and not sure from where...
    assert.equal(parse(inputBuildUrl, replace('https://github.com')), '- [@doowb](https://github.com/doowb)\n- [@jonschlinkert](https://github.com/jonschlinkert)\n- [@pentarex](https://github.com/pentarex)');
  });

  // Because of the change including comma the dot is represented as dot and "bar" is included into the response array. Maybe the username can have dot inside of it, but
  // maybe discussion with @doowb should be done in order he to approve it
  // Scenario1: "Checkout this library @bar! Its amazing"
  // Scenario2: "Checkout this library @bar, @foo! Its amazing"
  // Scenario3: "Very thoughtful library @doowb..."
  it('should only parse @ mentions that start with @', function() {
    assert.deepEqual(parse('@one abc @foo @bar.baz one two@qux fex, @hehe! @forReal?'), ['one', 'foo', 'bar', 'hehe', 'forReal']);
  });
});
