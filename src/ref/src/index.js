/**
 * @author monkindey
 * @date 2016.12.28
 * @description ref功能的使用场景
 * 在你封装的组件用到render里面的实例
 */

import React, { Component } from 'react';
import { render } from 'react-dom';

class AutoFocusInput extends Component {
	componentDidMount() {
		this.textInput.focus();
	}

	render() {
		return (
			<CustomInput ref={(input) => {this.textInput = input}}/>
		)
	}
}

class CustomInput extends Component {
	constructor(props) {
		super(props);
		this.focus = this.focus.bind(this);
	}

	focus() {
		this.textInput.focus();
	}

	componentDidMount() {
		console.log(this.refs.div);
	}

	render() {
		return (
			<div ref="div">
				<input type="text" ref={(input) => { this.textInput = input; }} />
			</div>
		)
	}
}

render(
	<AutoFocusInput />,
	document.getElementById('app')
)