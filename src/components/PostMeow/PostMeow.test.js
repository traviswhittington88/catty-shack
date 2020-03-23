import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import PostMeow from './PostMeow';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    <Router>
      <PostMeow />
    </Router>,
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});
