import React, { Component, PureComponent } from 'react';
import { render } from 'react-dom';

class ListOfWords extends PureComponent {
	render() {
		return (
			<div>{ this.props.words.join(',') }</div>
		)
	}
}

class WordAdder extends Component {
	constructor(props) {
		super(props);
		this.state = {
			words: ['marklar']
		};

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		const words = this.state.words;
		// words.push('marklar');
		this.setState({
			words: words.concat(`marklar${words.length}`)
		});
	}

	render() {
		return (
			<div>
				<button onClick={this.handleClick}>add</button>
				<ListOfWords words={ this.state.words }/>
			</div>
		)
	}
}

render(
	<WordAdder />,
	document.getElementById('app')
)