import React from 'react';
import { render } from 'react-dom';

const NameOfPerson = props => (
	<h1>Hello, { props.name }</h1>
);

const DetailOfPersion = props => (
	<div>
		<ul>
			<li>Age: { props.age }</li>
			<li>Bio: { props.bio }</li>
			<li>Address: { props.address }</li>
		</ul>
	</div>
)

const me = {
	name: 'kiho',
	age: '2x',
	bio: 'person',
	address: 'zhuhai'
}

render(
	<div>
		<NameOfPerson name="kiho"/> 
		<DetailOfPersion { ...me } />
	</div>,
	document.getElementById('app')
)

