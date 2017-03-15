import React, { Component } from 'react';
import { render } from 'react-dom';
import WheelNotOutSide from 'react-not-wheel-outside'

const parentStyle = {
	overflow: 'scroll',
	height: 2000,
	backgroundColor: 'lightgreen',
	padding: 10
};

const childStyle = {
	margin: '200px auto',
	maxHeight: 200,
	whiteSpace: 'nowrap',
	overflow: 'scroll',
	maxWidth: 200,
	backgroundColor: 'white'
};


class WheelBubble extends Component {
	constructor(props) {
		super(props);
		this.emitWheel = this.emitWheel.bind(this)
	}

	renderText() {
		return Array.apply(null, Array(50)).map((_, i) => {
			return (
				<span key={i}>
					Some text blah, Some text blah, Some text blah<br />
				</span>
			)
		})
	}

	emitWheel(e) {
		const { deltaY } = e;
		const { scrollTop, scrollHeight, offsetHeight } = this.target;

		const delta = deltaY === 0 ? deltaX : deltaY;

		if (scrollTop === 0 && (delta < 0) || scrollTop >= (scrollHeight - offsetHeight) && (delta > 0)) {
			e.preventDefault();
		}
	}

	render() {
		return (
			<div style={ parentStyle }>
				<WheelNotOutSide>
					<div style={ childStyle }>
						{ this.renderText() }
					</div>
				</WheelNotOutSide>
				<div ref={ (child) => { this.target = child} } onWheel={ this.emitWheel } style={ childStyle }>
					{ this.renderText() }
				</div>
			</div>
		)
	}
}

render(
	<WheelBubble />,
	document.getElementById('app')
)