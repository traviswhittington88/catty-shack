import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import SignupPage from './SignupPage';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(<Router><SignupPage /></Router>, div);

  ReactDOM.unmountComponentAtNode(div);
});