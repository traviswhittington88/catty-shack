import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import StaticProfile from './StaticProfile';

it('renders without crashing', () => {
  const div = document.createElement('div');

  const user = {
    user_name: 'Tex',
    likes: [{ id: 1, user_name: 'travis', meow_id: 3 }]
  };

  ReactDOM.render(
    <Router>
      <StaticProfile user={user} />
    </Router>,
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});
