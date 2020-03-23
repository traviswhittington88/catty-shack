import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Comments from './Comments';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    <Router>
      <Comments />
    </Router>,
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});
