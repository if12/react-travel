#!/usr/bin/env node

var config = {
	target: './src', // 在哪里生成对应的template
};

process.umask(0);

var fs = require('fs');
var ejs = require('ejs');
var fsEx = require('fs-extra');
var path = require('path');

var name = process.argv[2];
var newPath = path.resolve(config.target, name);

var preHtml = fs.readFileSync('./template/index.html').toString();
var template = ejs.compile(preHtml);
var html = template({
	name: name
});

fs.mkdir(newPath, function(err, stats) {
	fsEx.copySync('./template/', newPath, {
		filter: function(r) {
			if(/.html$/.test(r)) {
				return false;
			}
			return true;
		}
	});
	// 居然不能写入存在的文件?
	fs.writeFile(path.resolve(newPath, 'index.html'), html, function(err) {
		if (err) throw err;
		console.log('It\'s saved!');
	})
})