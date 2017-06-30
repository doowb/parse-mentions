'use strict';

require('mocha');
var url = require('url');
var assert = require('assert');
var parse = require('./');

function replace(prefix) {
  return function(tok) {
    return `[@${tok.name}](${url.resolve(prefix, tok.name)})`;
  };
}

function name(str) {
  var mentions = parse(str);
  if (mentions && mentions.length) {
    return mentions[0].name;
  }
}

describe('parse-mentions', function() {
  it('should export a function', function() {
    assert.equal(typeof parse, 'function');
  });

  it('should throw an error when invalid args are passed', function() {
    assert.throws(function() {
      parse();
    });
  });

  it('should return an array of mentions', function() {
    var mentions1 = parse('foo @doowb bar');
    assert(Array.isArray(mentions1));
    assert.equal(mentions1.length, 1);

    var mentions2 = parse('foo @doowb @pentarex bar');
    assert(Array.isArray(mentions2));
    assert.equal(mentions2.length, 2);

    var mentions3 = parse('foo @doowb @jonschlinkert @pentarex bar');
    assert(Array.isArray(mentions3));
    assert.equal(mentions3.length, 3);
  });

  it('should return the mention name on each match', function() {
    var mentions = parse('foo @doowb @jonschlinkert @pentarex bar');
    assert.equal(mentions[0].name, 'doowb');
    assert.equal(mentions[1].name, 'jonschlinkert');
    assert.equal(mentions[2].name, 'pentarex');
  });

  it('should return match arguments each match', function() {
    var mentions = parse('foo @doowb @jonschlinkert @pentarex bar');
    function filter(mention) {
      return mention.match.filter(Boolean);
    }
    assert.deepEqual(filter(mentions[0]), [ '@doowb', 'doowb' ]);
    assert.deepEqual(filter(mentions[1]), [ '@jonschlinkert', 'jonschlinkert' ]);
    assert.deepEqual(filter(mentions[2]), [ '@pentarex', 'pentarex' ]);
  });

  it('should transform matche tokens with the given function', function() {
    var fixture = '- @doowb\n- @jonschlinkert\n- @pentarex';

    assert.deepEqual(parse(fixture, replace('https://github.com')), [
      '[@doowb](https://github.com/doowb)',
      '[@jonschlinkert](https://github.com/jonschlinkert)',
      '[@pentarex](https://github.com/pentarex)'
    ]);
  });

  it('should handle casing correctly', function() {
    assert.equal(name(' @oNeTwO abc'), 'oNeTwO');
    assert.equal(name(' @ONE abc'), 'ONE');
  });

  it('should handle whitespace correctly', function() {
    assert.equal(name(' @one '), 'one');
    assert.equal(name('@one abc'), 'one');
    assert.equal(name('     @one     '), 'one');
    assert.equal(name('     @ one     '), undefined);
  });

  it('should not match when preceded by non-word characters', function() {
    assert.equal(name('two@qux'), undefined);
    assert.equal(name('.@qux'), 'qux');
    assert.equal(name(',@qux'), 'qux');
  });

  it('should not match when @ is followed by non-word characters', function() {
    assert.equal(name('@!qux'), undefined);
    assert.equal(name('@,qux'), undefined);
    assert.equal(name('@;qux'), undefined);
    assert.equal(name('@?qux'), undefined);
    assert.equal(name('@@qux'), undefined);
  });

  it('should handle trailing punctuation correctly', function() {
    assert.equal(name('@bar.'), 'bar');
    assert.equal(name('@bar.baz one '), 'bar');
    assert.equal(name('@bar. one '), 'bar');
    assert.equal(name('fex, @foo! '), 'foo');
    assert.equal(name(',@foo? '), 'foo');
    assert.equal(name('@foo?'), 'foo');
    assert.equal(name('@foo;'), 'foo');
    assert.equal(name('@foo|'), 'foo');
    assert.equal(name('@foo^'), 'foo');
    assert.equal(name('@foo*'), 'foo');
    assert.equal(name('@foo%'), 'foo');
    assert.equal(name('@foo#'), 'foo');
    assert.equal(name('@foo@'), 'foo');
  });
});
