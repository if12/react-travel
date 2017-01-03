import React from 'react';
import { render } from 'react-dom';

function timer() {
	const Timer = (
		<div>
			<h1>Now is</h1>
			<h2>{ new Date().toLocaleTimeString() }</h2>	
		</div>
	);

	render(Timer, document.getElementById('app'))
}

setInterval(timer, 1000)