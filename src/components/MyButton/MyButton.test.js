import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import MyButton from './MyButton';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    <Router>
      <MyButton />
    </Router>,
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});
