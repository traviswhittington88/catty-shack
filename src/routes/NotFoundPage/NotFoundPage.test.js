import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import NotFoundPage from './NotFoundPage';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(<Router><NotFoundPage /></Router>, div);

  ReactDOM.unmountComponentAtNode(div);
});