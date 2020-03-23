import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import EditDetails from './EditDetails';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    <Router>
      <EditDetails bio={'My name is fuzzy and I like fish'} details={''} />
    </Router>,
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});
