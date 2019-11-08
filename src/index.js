import React from 'react';
import { render } from 'react-dom';
import { Main } from './components/Main';
import './static/styles/index.css';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import './components/testModule.js';

render(
	<Router>
		<Route path="/" component={Main} />
	</Router>,
	document.getElementById('root'),
);
