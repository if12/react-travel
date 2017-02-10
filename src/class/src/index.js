/**
 * 两者的不同
 * by https://toddmotto.com/react-create-class-versus-component/#syntax-differences
 *
 * 1. 语法
 * 2. propTypes
 * 3. getDefaultProps
 * 4. State
 * 5. this
 * 6. Mixins
 */

import React, { Component } from 'react';
import { render } from 'react-dom';

class HelloReactByComponent extends Component {
	render() {
		return (
			<div>
				Hello React Class By extends Component
			</div>
		)
	}
}

const HelloReactByCreateClass = React.createClass({
	render: function() {
		return (
			<div>
				Hello React Class By React.createClass
			</div>
		)
	}
})

class HelloReact extends Component {
	constructor(props) {
		super(props);
		this.state = {
			component: true
		}
	}

	toggle() {
		let component = this.state.component;
		this.setState({
			component: !component
		})
	}

	render() {
		return (
			<div>
				<button onClick={ this.toggle.bind(this) }>切换</button>
				{
					this.state.component ? 
					<HelloReactByComponent />
					: <HelloReactByCreateClass />
				}
			</div>
		)
	}
}

render(
	<HelloReact />,
	document.getElementById('app')
)