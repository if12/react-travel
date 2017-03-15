import React, { Component } from 'react';
import { render } from 'react-dom';

function increment(state, props) {
	return {
		value: state.value + 1
	}
}

class Counter extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: 0
		};
		this.handle = this.handle.bind(this);
	}

	handle() {
		this.setState(increment);
		this.setState(increment);
		this.setState(increment);

		// this.setState({
		// 	value: (this.state.value + 1)
		// });

		// this.setState({
		// 	value: (this.state.value + 1)
		// })
	}

	render() {
		return (
			<div>
				<button onClick={ this.handle }>+</button>
				<span>{ this.state.value }</span>
			</div>
		)
	}
}

render(
	<Counter />,
	document.getElementById('app')
)