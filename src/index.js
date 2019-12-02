import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { render } from 'react-dom';
import { Main } from './components/Main';
import './static/styles/index.css';

import './components/testModule.js';

render(
	<Router>
		<Route path="/" component={Main} />
	</Router>,
	document.getElementById('root'),
);
