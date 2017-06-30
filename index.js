'use strict';

/**
 * Parses a string and returns an array of `@mention` objects.
 *
 * ```js
 * var mentions = parseMentions('Foo @doowb bar @jonschlinkert');
 * ```
 * @name parse
 * @param  {String} `str` Input string to parse looking for @ mentions.
 * @param  {Function} `fn` Optional replace function. When passed in, the @ mentions are replaced in the string instead of returned as an array. The new string is returned.
 * @return {String|Array} Array of mention objects, with `name` and `match` arguments.
 * @api public
 */

module.exports = function(str, fn) {
  if (typeof str !== 'string') {
    throw new TypeError('expected a string');
  }

  var re = /(?:[\w_＠@][＠@])|[＠@]([\w_]{1,15})(?=$|[^\w_])/g;
  var mentions = [];
  var match;

  while ((match = re.exec(str))) {
    if (!match[1]) continue;
    var tok = {name: match[1], match: match };
    if (typeof fn === 'function') {
      mentions.push(fn(tok) || tok);
    } else {
      mentions.push(tok);
    }
  }
  return mentions;
};
