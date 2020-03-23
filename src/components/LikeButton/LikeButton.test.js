import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import LikeButton from './LikeButton';
import AppContext from '../../contexts/appContext';

it('renders without crashing', () => {
  const div = document.createElement('div');
  let user = { likes: [{ id: 1, user_name: 'travis', meow_id: 3 }] };
  ReactDOM.render(
    <AppContext.Provider value={{ user }}>
      <Router>
        <LikeButton />
      </Router>
    </AppContext.Provider>,
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});
