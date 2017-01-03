/**
 * 组件的生命周期可以看成人的生命周期
 * 每一次经历的都是一次刷新的情况
 * 存在一个经验值(experience)和年龄(age)
 */

import React, { Component } from 'react';
import { render } from 'react-dom';

class Person extends Component {
	constructor(props) {
		super(props);

		// getInitialState
		this.state = {
			experience: 0,
			age: 0
		}
	}

	fourYo() {
		return {
			experience: 4,
			age: 4
		}
	}

	tenYo() {
		return {
			experience: 16,
			age: 10
		}
	}

	sixtYo() {
		return {
			experience: 32,
			age: 16
		}
	}

	timer: null

	// 我将出生了，可是我的命运好像会被别人主宰
	componentWillMount() {
		const { fourYo, tenYo, sixtYo } = this;
		var i = 0;
		var process = [fourYo, tenYo, sixtYo];
		this.timer = setInterval(() => {
			if(i === process.length - 1) {
				clearInterval(this.timer);
			}
			this.setState({
				...process[i]()
			});
			i++;
		}, 2000);

		console.log('我还在妈妈的肚子里 - componentWillMount');
	}

	componentDidMount() {
		console.log('我哭了，终于出生了 - componentDidMount');
	}

	shouldComponentUpdate() {
		console.log('不想长大，可惜没有办法 - shouldComponentUpdate');
		return true
	}

	componentWillUpdate(nextProps, nextState) {
		console.log(`我将要${nextState.age}岁了 - componentWillUpdate`);
	}

	componentWillUpdate(prevProps, prevState) {
		console.log(`我${prevState.age}岁了 - shouldComponentUpdate`);
	}

	render() {
		const { age, experience } = this.state;
		console.log(`爸爸妈妈看到我的${age}岁样子了 - render`);
		return (
			<div>
				<h4>请打开开发者工具</h4>
				I am { age } year old with { experience } level
			</div>
		)
	}
}

render(
	<Person />,
	document.getElementById('app')
)