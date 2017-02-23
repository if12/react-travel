#!/usr/bin/env node

var meow = require('meow');
var open = require('open');

var cli = meow(`
	Usage
		$ open [url] [browser]
	Examples
		$ open http://www.google.com
		$ open http://www.google.com safari
`)

const url = cli.input[0];
const browser = cli.input[1];

if (url) {
	open(url);
	if (browser) {
		open(url, browser);
	}
}