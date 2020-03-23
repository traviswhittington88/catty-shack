import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Notifications from './Notifications';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    <Router>
      <Notifications />
    </Router>,
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});
