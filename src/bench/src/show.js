/**
 * @author monkindey
 * @description 参考 js-framework-benchmark 项目
 */
var fs = require('fs');
var path = require('path');
var ejs = require('ejs');

var bms = require('./bms');

var statsFolder = './stats';
var stats = fs
	.readdirSync(statsFolder)
	.filter(function(dir) {
		// filter the dot file, i.e .DS_Store
		return dir.slice(0, 1) !== '.'
	})
	.map(function(dir) {
		var fullDir = path.resolve(statsFolder, dir);
		var files = fs.readdirSync(fullDir);
		var fullPath;
		var dataWrap = {};
		var data = files.reduce(function(acc, file) {
			fullPath = path.resolve(fullDir, file);
			acc[file.replace(/\.\w+/, '')] = JSON.parse(fs.readFileSync(fullPath));
			return acc
		}, {});
		dataWrap[dir] = data

		return dataWrap
	}).reduce(function(acc, data) {
		Object.assign(acc, data)
		return acc;
	}, {})

var titles = Object.keys(stats);
console.dir(stats);

var preHTML = fs.readFileSync('./template/index.ejs').toString();
var template = ejs.compile(preHTML);
var html = template({
	stats: stats,
	titles: titles,
	bms: bms
});

fs.writeFile('../table.html', html, function(err) {
	if(err) throw err;
	console.log('It\'s showing!')
})