import React, { Component } from 'react';
import { render } from 'react-dom';

class HelloReact extends Component {
	render() {
		return (
			<div>
				Hello React
			</div>
		)
	}
}

render(
	<HelloReact />,
	document.getElementById('app')
)
