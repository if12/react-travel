/**
 * 参考 React Example
 */
import React, { Component } from 'react';
import { render } from 'react-dom';

const proto = Object.create(HTMLElement.prototype, {
	attachedCallback: {
		value: function() {
			var mountPoint = document.createElement('span');
			this.createShadowRoot().appendChild(mountPoint);

			var name = this.getAttribute('name');
			var url = 'https://www.google.com/search?q=' + encodeURIComponent(name);
			render(
				<a href={url}>{name}</a>,
				mountPoint
			)
		}
	}
});

document.registerElement('x-search', {prototype: proto});

class HelloWebComponent extends Component {
	render() {
		return (
			<div>Hello <x-search name={this.props.name} />!</div>
		)
	}
}

render(
	<HelloWebComponent name="React"/>,
	document.getElementById('app')
)
