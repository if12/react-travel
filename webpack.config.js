var path = require('path');
var fs = require('fs');

var exclude = ['hello-react', 'vendor', '.git'];
var entries = fs.readdirSync('.')
	.filter(function(f) {
		return fs.statSync(f).isDirectory() && exclude.indexOf(f) < 0;
	}).reduce(function(p, c, i) {
		var assigned = {};
		assigned[c] = path.resolve(__dirname, c, './src/index.js');
		return Object.assign(p, assigned);
	}, {})

module.exports = {
	entry: entries,
	output: {
		path: __dirname,
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