import { startMonitor, stopMonitor } from './monitor'

var usedEnv = 'local';
var STORAGE_KEY = 'commits';
// var reactCommits = require('./commits');
// console.log(JSON.parse(reactCommits));

export function setEnv(env) {
	usedEnv = env;
}

function _random(max) {
	return Math.round(Math.random() * max);
}

function queryDup(arr, fn) {
	var map = arr.reduce(function(acc, val) {
		if (!acc[fn(val)]) {
			acc[fn(val)] = 1
		} else {
			acc[fn(val)]++
		}
		return acc;
	}, {});

	// console.log(Object.keys(map).length);
}

function fetchGithub(count) {
	var commits = [];
	var reactApi = 'https://api.github.com/repos/facebook/react/commits?';
	var perPage = 100;
	var allPage = count / perPage + 1;

	if (count % perPage) {
		allPage = allPage + 1;
	}

	function stringifyParams(params) {
		return Object.keys(params).map(function(key) {
			return encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
		}).join('&')
	}

	return (function fetchBychunk(count) {
		var params = {
			page: allPage - (count / perPage),
			per_page: perPage
		}

		return fetch(reactApi + stringifyParams(params))
			.then(function(res) {
				if (res.ok) {
					return res.json();
				}
			}).then(function(data) {
				commits = commits.concat(data);
				if ((count - perPage) > 0) {
					return fetchBychunk(count - perPage)
				} else {
					return commits
				}
			})
	})(count)
}

export class Store {
	constructor() {
		this.data = [];
		this.id = 1;
		// fetchGithub(200).then(function(commits) {
		// 	queryDup(commits, function(val) {
		// 		return val['sha']
		// 	});
		// 	localStorage.setItem(STORAGE_KEY, JSON.stringify(commits))
		// });
	}

	replace() {
		// if(usedEnv === 'github') {
		// 	this.data = this.buildData().reverse();
		// 	return;
		// }
		this.data = this.buildData();
	}

	add(count) {
		this.data = this.data.concat(this.buildData(count));
	}

	interpolate(count) {
		var loc = _random(this.data.length);
		if (loc !== undefined) {
			this.data.splice(loc, 0, ...this.buildData(count))
		}
	}

	delete(id) {
		this.data = this.data.filter(d => !(d.id === id));
		debugger;
	}

	clear() {
		this.data = [];
	}

	swap(mod = 10) {
		var div = this.data.length / mod;
		var tmp;
		for (var i = 0; i < div - 1; i++) {
			tmp = this.data[i * mod + 4];
			this.data[i * mod + 4] = this.data[i * mod + 9];
			this.data[i * mod + 9] = tmp;
		}
	}

	update(mod = 10) {
		for (var i = 0; i < this.data.length; i += mod) {
			this.data[i] = Object.assign({}, this.data[i], {
				label: this.data[i].label + '!!!'
			});
		}
	}

	buildData(count = 1000) {
		// if (usedEnv === 'github') {
		// 	if(!localStorage.getItem(STORAGE_KEY)) {
		// 		alert('稍等, 正在为你获取数据');
		// 		return;
		// 	}
		// 	return JSON.parse(localStorage.getItem(STORAGE_KEY))
		// }

		var data = [];
		const adjectives = ['pretty', 'large', 'big', 'small', 'tall', 'short', 'long', 'handsome',
			'plain', 'quaint', 'clean', 'elegant', 'easy', 'angry', 'crazy', 'helpful', 'mushy', 'odd',
			'unsightly', 'adorable', 'important', 'inexpensive', 'cheap', 'expensive', 'fancy'
		];

		const colors = ['red', 'yellow', 'blue', 'green', 'pink', 'brown', 'purple', 'brown', 'white', 'black', 'orange']
		const nouns = ['table', 'chair', 'house', 'bbq', 'desk', 'car', 'pony', 'cookie', 'sandwich', 'burger', 'pizza', 'mouse', 'keyboard'];

		for (var i = 0; i < count; i++) {
			data.push({
				id: this.id++,
				label: `${ adjectives[_random(adjectives.length)]} ${colors[_random(colors.length)]}  ${nouns[_random(nouns.length)]}`
			});
		}

		return data;
	}
}