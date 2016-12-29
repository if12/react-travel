/**
 * React uncontrolled & controlled Component
 * https://goshakkk.name/controlled-vs-uncontrolled-inputs-react/
 */

import React, { Component } from 'react';
import { render } from 'react-dom';

class UncontrolledLogin extends Component {
	handleSubmitClick = () => {
		var user = this.userInput.value;
		var pwd = this.pwdInput.value;
		console.log(user, pwd);
	}

	render() {
		return (
			<div>
				<p>
					<label htmlFor="">账号: </label>
					<input type="text" defaultValue="zhangkaihao" ref={input => this.userInput = input} />
				</p>
				<p>
					<label htmlFor="">密码: </label>
					<input type="text" ref={input => this.pwdInput = input} />
				</p>
				<button onClick={this.handleSubmitClick}>Sign up</button>
			</div>
		)
	}
}

class ControlledLogin extends Component {
	constructor() {
		super();
		this.state = {
			user: '12312',
			pwd: ''
		}
	}

	handleInputChange = (which) => {
		return e => {
			this.setState({
				[which]: e.target.value
			})
		}
	}

	handleSubmitClick = () => {
		console.log(this.state);
	}

	render() {
		return (
			<div>
				<p>
					<label htmlFor="" value={ this.state.user }>账号: </label>
					<input type="text" 
						onChange={ this.handleInputChange('user') } 
						value={ this.state.user }/>
				</p>
				<p>
					<label htmlFor="">密码: </label>
					<input type="text"
						onChange={ this.handleInputChange('pwd') } 
						value={ this.state.pwd } />
				</p>
				<button onClick={this.handleSubmitClick}>Sign up</button>
			</div>
		)
	}
}

render(
	<UncontrolledLogin />,
	document.getElementById('uncontrolled')
)

render(
	<ControlledLogin />,
	document.getElementById('controlled')
)


