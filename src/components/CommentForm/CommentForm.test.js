import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import CommentForm from './CommentForm';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    <Router>
      <CommentForm />
    </Router>,
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});
