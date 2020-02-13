import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import Profile from '../Profile';

const mockStore = configureStore([]);

describe('Test Redux Components', () => {
	let component;
	let store;

	beforeEach(() => {
		store = mockStore({
			globalState: {state: {frameStyles: {Profile: {}}}},
		});
		component = renderer.create(
			<Provider store={store}>
				<Profile />
			</Provider>,
		);
	});

	it('renders somehow', () => {
		expect(component.toJSON()).toMatchSnapshot();
	});
});
