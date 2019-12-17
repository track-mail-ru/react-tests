import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import Main from './components/Main';
import './static/styles/fonts.css';
import './static/styles/index.css';
import store from './store';

render(
	<Provider store={store}>
		<Router>
			<Route path="/" component={Main} />
		</Router>
	</Provider>,
	document.getElementById('root'),
);
