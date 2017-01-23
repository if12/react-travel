/**
 * ReactCSSTransitionGroup and ReactTransitionGroup
 * staggerIn 参考 http://stackoverflow.com/questions/29977799/how-should-i-handle-a-leave-animation-in-componentwillunmount-in-react
 */

import React, { Component, Children } from 'react';
import { render, findDOMNode } from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ReactTransitionGroup from 'react-addons-transition-group';
import 'style-loader!raw-loader!./index.css';

/**
 * <StaggerIn>
 * 		<div>...</div>
 * 		<div>...</div>
 * 		<div>...</div>
 * <StaggerIn />
 */
function StaggerIn(props) {
	let component = props.component || 'div';
	let delay = props.delay || 0;
	let childCount = Children.count(props.children);
	let childrenWithStagger = Children.map(props.children, (child, i) => {
		var inDelay = delay * i;
		return (
			<StaggeringChild key={ child.key }
				animateInDelay={ inDelay }>
				{ child }
			</StaggeringChild>
		)
	});

	return (
		<ReactTransitionGroup component={ component }>
			{ childrenWithStagger }
		</ReactTransitionGroup>
	)
}

// ReactTransitionGroup
class StaggeringChild extends Component {
	componentWillAppear(cb) {
		console.log('componentWillAppear');
		this._animateIn(cb);
	}

	componentWillEnter(cb) {
		console.log('componentWillEnter');
		this._animateIn(cb);
	}

	componentWillLeave(cb) {
		this._animateOut(cb);
	}

	_animateIn(cb) {
		let el = findDOMNode(this);
		TweenLite.set(el, {
			opacity: 0
		});
		setTimeout(function() {
			console.log('timed in');
			TweenLite.to(el, 1, { opacity: 1 }).play().eventCallback('onComplete', cb);
		}, this.props.animateInDelay)
	}

	_animateOut(cb) {
		let el = findDOMNode(this);
		let outDelay = this.props.animateInDelay || 0;
		
		setTimeout(function() {
			TweenLite.to(el, 1, { opacity: 0 }).play().eventCallback('onComplete', cb)
		}, outDelay)
	}

	componentDidAppear() {
		console.log('componentDidAppear');
	}

	render() {
		const { item, handleClick, children } = this.props;
		return (
			<div>
				{ children }
			</div>
		)
	}
}

/**
 * React官方例子
 */
class TodoList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			items: ['I', 'am', 'a', 'todo']
		};
		this.handleAdd = this.handleAdd.bind(this);
	}

	handleRemove(i) {
		let newItems = this.state.items.slice();
		newItems.splice(i, 1);
		this.setState({
			items: newItems
		})
	}

	handleAdd() {
		const newItems = this.state.items.concat([
			prompt('Enter some text')
		]);

		this.setState({
			items: newItems
		});
	}

	render() {
		const items = this.state.items.map((item, i) => (
			<div key={ item } onClick={ () => this.handleRemove(i) }>
				{ item }
			</div>
		));

		const lis = this.state.items.map((item, i) => (
			<li key={ item }>
				{ item }
			</li>
		));

		return (
			<div>
				<button onClick={ this.handleAdd }>Add Item</button>
				<ReactCSSTransitionGroup
					transitionName="example"
					transitionAppear={ true }
					transitionAppearTimeout={ 500 }
					transitionEnterTimeout={ 500 }
					transitionLeaveTimeout={ 300 }>
					{ items }
				</ReactCSSTransitionGroup>

				<StaggerIn delay={ 500 } component="ul">
					{ lis }
				</StaggerIn>
			</div>
		)
	}
}

render(
	<TodoList />,
	document.getElementById('app')
)