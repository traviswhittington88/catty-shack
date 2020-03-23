import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Tooltip from './Tooltip';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    <Router>
      <Tooltip />
    </Router>,
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});
