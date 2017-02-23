/**
 * @author monkindey
 * https://medium.com/code-life/how-to-benchmark-react-components-the-quick-and-dirty-guide-f595baf1014c#.27c5kcm0a
 */

import React, { Component, PureComponent } from 'react'
import { render } from 'react-dom'
import Perf from 'react-addons-perf'

class ListItem extends PureComponent {
	render() {
		return (
			<li>
				{ this.props.text }
			</li>
		)
	}
}

function generateArray(num) {
	return Array.apply(null, {
		length: num
	}).map(Number.call, Number)
}

class HelloReact extends Component {
	constructor(props) {
		super(props);
		this.state = {
			multiplier: 1
		}
	}

	resetMultiplier() {
		Perf.start();
		this.setState({
			multiplier: this.state.multiplier + 1
		})
	}

	componentDidUpdate() {
		Perf.stop();
		Perf.printExclusive();
		Perf.printOperations();
		Perf.printWasted();
	}

	render() {
		var size = 100;
		return (
			<div>
				<button onClick={ this.resetMultiplier.bind(this) }>Click</button>
				<ul>
					{
						generateArray(size).map(i => (
							<ListItem key={i} text={i}/>
						))
					}

					{
						generateArray(size).map(i => {
							var text = size + i + this.state.multiplier;
							return <ListItem key={i} text={text}/>
						})
					}
				</ul>
			</div>
		)
	}
}

render(
	<HelloReact />,
	document.getElementById('app')
)