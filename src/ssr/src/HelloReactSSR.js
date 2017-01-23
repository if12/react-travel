import React, { Component } from 'react';

export default class HelloReactSSR extends Component {
	handleClick() {
		console.log('handleClick');
	}

	render() {
		return (
			<div>
				<h4 onClick={ this.handleClick }>Hello React SSR</h4>
			</div>
		)
	}
}
