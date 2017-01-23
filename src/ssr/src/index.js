import React, { Component } from 'react';
import { render } from 'react-dom';
import HelloReactSSR from './HelloReactSSR'

render(
	<HelloReactSSR />,
	document.getElementById('app')
)
