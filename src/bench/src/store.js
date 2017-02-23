import { startMonitor, stopMonitor } from './monitor'

function _random(max) {
	return Math.round(Math.random() * max);
}

export class Store {
	constructor() {
		this.data = [];
		this.id = 1;
	}

	replace() {
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