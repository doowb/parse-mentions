# parse-mentions [![NPM version](https://img.shields.io/npm/v/parse-mentions.svg?style=flat)](https://www.npmjs.com/package/parse-mentions) [![NPM monthly downloads](https://img.shields.io/npm/dm/parse-mentions.svg?style=flat)](https://npmjs.org/package/parse-mentions) [![NPM total downloads](https://img.shields.io/npm/dt/parse-mentions.svg?style=flat)](https://npmjs.org/package/parse-mentions) [![Linux Build Status](https://img.shields.io/travis/doowb/parse-mentions.svg?style=flat&label=Travis)](https://travis-ci.org/doowb/parse-mentions)

> Parse and optionally replace @ mentions from a string of text.

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install --save parse-mentions
```

## Usage

```js
var parse = require('parse-mentions');
```

## API

### [.parse](index.js#L16)

Parses a string and returns an array of `@mention` objects.

**Params**

* `str` **{String}**: Input string to parse looking for @ mentions.
* `fn` **{Function}**: Optional replace function. When passed in, the @ mentions are replaced in the string instead of returned as an array. The new string is returned.
* `returns` **{String|Array}**: Array of mention objects, with `name` and `match` arguments.

**Example**

```js
var mentions = parseMentions('Foo @doowb bar @jonschlinkert');
```

## About

### Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](../../issues/new).

Please read the [contributing guide](.github/contributing.md) for advice on opening issues, pull requests, and coding standards.

### Building docs

_(This project's readme.md is generated by [verb](https://github.com/verbose/verb-generate-readme), please don't edit the readme directly. Any changes to the readme must be made in the [.verb.md](.verb.md) readme template.)_

To generate the readme, run the following command:

```sh
$ npm install -g verbose/verb#dev verb-generate-readme && verb
```

### Running tests

Running and reviewing unit tests is a great way to get familiarized with a library and its API. You can install dependencies and run tests with the following command:

```sh
$ npm install && npm test
```

### Author

**Brian Woodward**

* [github/doowb](https://github.com/doowb)
* [twitter/doowb](https://twitter.com/doowb)

### License

Copyright © 2017, [Brian Woodward](https://github.com/doowb).
Released under the [MIT License](LICENSE).

***

_This file was generated by [verb-generate-readme](https://github.com/verbose/verb-generate-readme), v0.6.0, on June 29, 2017._