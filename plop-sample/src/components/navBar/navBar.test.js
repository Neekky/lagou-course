import React from 'react';
import ReactDOM from 'react-dom';
import navBar from './navBar';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<navBar />, div);
  ReactDOM.unmountComponentAtNode(div);
});
