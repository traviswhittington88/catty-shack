import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import Meow from './Meow';
import { now } from 'moment';
import AppContext from '../../contexts/appContext';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const meow = {
    meow_id: 1,
    userhandle: 'Tex',
    body: 'Howdy',
    user_image: '',
    date_created: now(),
    likeCount: 5,
    commentCount: 2
  };

  const user = {
    user_name: 'Tex',
    likes: [{ id: 1, user_name: 'travis', meow_id: 3 }]
  };

  ReactDOM.render(
    <AppContext.Provider value={{ user, meow }}>
      <Router>
        <Meow meow={meow} user={user} />
      </Router>
    </AppContext.Provider>,
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});
