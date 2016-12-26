import React from 'react';
import { render } from 'react-dom';

const HelloReact = props => (
	<div>Hello React</div>
);

render(
	<HelloReact />,
	document.getElementById('app')
)

