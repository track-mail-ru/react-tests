import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import Main from './components/Main';
import './static/styles/fonts.css';
import './static/styles/index.css';
import store from './store';

render(
	<Provider store={store}>
		<Main />
	</Provider>,
	document.getElementById('root'),
);
