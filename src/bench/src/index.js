/**
 * @author monkindey
 * @description 
 * bind
 * arrow function do not have arguments
 */

import React, { Component } from 'react';
import { render } from 'react-dom';
import { Store } from './store'
import { startMonitor, stopMonitor } from './monitor'

// '' | key | scu(shouldComponentUpdate) | key, scu
var search = window.location.search.slice(1).split(',');
var Row;

function shouldUseScu(search) {
	return search.indexOf('scu') !== -1;
}

function shouldUseKey(search) {
	return search.indexOf('key') !== -1;
}

if (shouldUseScu(search)) {
	Row = class _Row extends Component {
		shouldComponentUpdate(nextProps) {
			if (nextProps.text === this.props.text) {
				return false;
			}

			return true;
		}

		render() {
			const { text, onDelete } = this.props;
			return (
				<li>
					<span>{ text }</span>
					<button onClick={ onDelete }>删除</button>
				</li>
			)
		}
	}
} else {
	Row = class __Row extends Component {
		render() {
			const { text, onDelete } = this.props;
			return (
				<li>
					<span>{ text }</span>
					<button onClick={ onDelete }>删除</button>
				</li>
			)
		}
	}
}

class HelloReactPerf extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: []
		}

		this.store = new Store();
		this.ops = ['add', 'replace', 'interpolate', 'update', 'delete', 'clear', 'swap'];
		this.makeOp.bind(this)();

		this.printDuration = this.printDuration.bind(this);
	}

	printDuration() {
		stopMonitor();
	}

	makeOp() {
		this.ops.forEach((name) => {
			this[name] = (...args) => {
				this.store[name].apply(this.store, args);
				startMonitor(name);
				this.setState({
					data: this.store.data
				});
			}
		})
	}

	renderRow(data) {
		if (shouldUseKey(search)) {
			return data.map(d => (
				<Row key={ d.id } 
					text={ d.label } 
					onDelete={ this.delete.bind(this, d.id) } />
			))
		} else {
			return data.map(d => (
				<Row text={ d.label } 
					onDelete={ this.delete.bind(this, d.id) } />
			))
		}
	}

	componentDidUpdate() {
		this.printDuration();
	}

	render() {
		return (
			<div>
				<p>
					{
						this.ops.map(op => {
							if(op !== 'delete') {
								return (
									<button id={ op } key={ op }
										onClick={ this[op].bind(this, undefined) }>
										{ op }
									</button>
								)
							}
						})
					}
				</p>

				<ol>
					{ this.renderRow(this.state.data) }
				</ol>
			</div>
		)
	}
}

render(
	<HelloReactPerf />,
	document.getElementById('app')
)