import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Profile from './Profile';
import AppContext from '../../contexts/appContext';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const user = {
    user_name: 'Tex',
    likes: [{ id: 1, user_name: 'travis', meow_id: 3 }],
    user_image: 'no-img.png'
  };

  const getUser = () => {
    console.log('yaaay');
  };

  ReactDOM.render(
    <AppContext.Provider value={{ user, getUser }}>
      <Router>
        <Profile />
      </Router>
    </AppContext.Provider>,
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});
