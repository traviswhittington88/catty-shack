import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import MeowSkeleton from './MeowSkeleton';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    <Router>
      <MeowSkeleton />
    </Router>,
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});
