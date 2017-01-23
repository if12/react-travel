/**
 * React reconciliation
 * 
 * by http://www.infoq.com/cn/articles/react-dom-diff
 * 高效的diff算法吗
 * 作为有态度的程序员，我们总是对技术背后的原理充满着好奇
 * 写例子less的时候感觉数学捉急呀
 *
 * 原则:
 * 不同的组件产生不一样的DOM结构
 * 逐层比较
 * 树形结构 递归
 *
 * 想法:
 * 页面充满了增删查改
 * 如何快准找到需要修改的节点
 */
import 'style!raw!less!./index.less';

import React, { Component } from 'react';
import { render } from 'react-dom';

function createNode(name) {
	class Node extends Component {
		constructor(props) {
			super(props);
			console.log(name + ' is created');
		}

		componentDidMount() {
			console.log(name + ' did mount.');
		}

		componentWillUnmount() {
			console.log(name + ' will unmount.');
		}

		componentDidUpdate() {
			console.log(name + ' is updated.');
		}

		render() {
			return (
				<div className={ "node " + name } data-name={name}>
					{ this.props.children }
				</div>
			)
		}
	}

	return Node;
}

const Root = createNode('root');
const A = createNode('a');
const B = createNode('b');
const C = createNode('c');
const D = createNode('d');

class Diff extends Component {
	constructor(props) {
		super(props);
		this.state = {
			shape: 1
		}
	}

	shape1() {
		return (
			<Root>
				<A>
					<B></B>
					<C></C>
				</A>
				<D></D>
			</Root>
		)
	}

	shape2() {
		return (
			<Root>
				<A>
					<B />
				</A>
				<D>
					<C />
				</D>
			</Root>
		)
	}

	addShape(name) {
		return 'shape' + name;
	}

	renderBtns() {
		const btns = [1, 2];
		return btns.map(b => (
			<button onClick={ ()=>{ this.setState({ shape: b }) }}>{ this.addShape(b) }</button>
		))
	}

	render() {
		return (
			<div className="diff-view">
				{ this.renderBtns() }
				{ this[this.addShape(this.state.shape)]() }
			</div>
		)
	}
}

render(
	<Diff />,
	document.getElementById('app')
)