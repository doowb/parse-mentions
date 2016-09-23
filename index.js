'use strict';

var extend = require('extend-shallow');

/**
 * Parse a string to retrieve or replace @ mention strings.
 *
 * ```js
 * // get an array of @ mention strings
 * var mentions = parse('- @doowb\n- @jonschlinkert');
 * console.log(mentions);
 * //=> ['doowb', 'jonschlinkert']
 *
 * // replace @ mention strings with a url
 * var str = parse('- @doowb\n- @jonschlinkert', function(name) {
 *   return `[@${name}](https://github.com/${name})`;
 * });
 * console.log(str);
 * //=> - [@doowb](https://github.com/doowb)
 * //=> - [@jonschlinkert](https://github.com/jonschlinkert)
 *
 * // get an array of @ mention objects
 * var mentions = parse('- @doowb\n- @jonschlinkert', {stringify: false});
 * console.log(mentions);
 * //=> [
 * //=>   {name: 'doowb', mention: '@doowb', index: 2},
 * //=>   {name: 'jonschlinkert', mention: '@jonschlinkert', index: 11}
 * //=> ]
 * ```
 *
 * @param  {String} `str` Input string to parse looking for @ mentions.
 * @param  {Object} `options` Optional options object to control the output of the @ mentions
 * @param  {Boolean} `options.stringify` Should the @ mentions be stringified in the output array. When `false` an object with additional information about the mention is returned. Defaults to `true`.
 * @param  {Function} `fn` Optional replace function. When passed in, the @ mentions are replaced in the string instead of returned as an array. The new string is returned.
 * @return {String|Array} Array of mentions when a replace function is not passed in.
 * @api public
 */

function parse(str, options, fn) {
  if (typeof str !== 'string') {
    throw new Error('expected first argument to be a string')
  }

  if (typeof options === 'function') {
    fn = options;
    options = {};
  }

  var re = /(\w@)|@([\w_]{0,15})(?=$|\s)/g;
  var opts = extend({}, options);

  if (typeof fn === 'function') {
    return str.replace(re, function(m, $1, $2) {
      if ($2) return fn($2);
      return m;
    });
  }

  var transform = function(m) {
    return m[2];
  };

  // default is to stringify the mentions and just return the array
  // when false, this allows the user to do replacements based on string index themselves
  if (opts.stringify === false) {
    transform = function(m) {
      return {
        name: m[2],
        mention: m[0],
        index: m.index
      };
    };
  }

  var m;
  var mentions = [];
  while(m = re.exec(str)) {
    if (m[2]) {
      mentions.push(transform(m));
    }
  }
  return mentions;
}

/**
 * Expose `parse`
 */

module.exports = parse;
