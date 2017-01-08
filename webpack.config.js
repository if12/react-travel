var path = require('path');
var fs = require('fs');

var exclude = ['hello-react', 'mixin'];
var SRC_DIR = path.resolve(__dirname, 'src');
var entries = fs.readdirSync('./src/')
	.filter(function(f) {
		return fs.statSync(path.resolve(SRC_DIR, f)).isDirectory() && exclude.indexOf(f) < 0;
	}).reduce(function(p, c, i) {
		var assigned = {};
		assigned[c] = path.resolve(SRC_DIR, c, './src/index.js');
		return Object.assign(p, assigned);
	}, {})

module.exports = {
	entry: entries,
	output: {
		path: SRC_DIR,
		publicPath: '/static/',
		filename: '[name]/bundle.js',
	},
	resolve: {
		extensions: ["", ".js", ".jsx"],
	},
	module: {
		loaders: [{
			test: /\.(jsx|js)$/,
			exclude: /node_modules/,
			loader: 'babel'
		}]
	}
}