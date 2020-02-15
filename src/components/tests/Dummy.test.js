
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import Dummy  from '../Dummy';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('renders with or without props', () => {
  act(() => {
    render(<Dummy />, container);
  });
  expect(container.textContent).toBe('Dummy, you');

  act(() => {
    render(<Dummy one="Martin" />, container);
  });
  expect(container.textContent).toBe('Dummy, Martin!');

  act(() => {
    render(<Dummy one="Alex" />, container);
  });
  expect(container.textContent).toBe('Dummy, Alex!');
});
