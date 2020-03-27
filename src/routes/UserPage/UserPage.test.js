import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import AppContext from '../../contexts/appContext';
import UserPage from '../UserPage/UserPage';

it('renders without crashing', () => {
  const div = document.createElement('div');

  const user = {
    user_image: ''
  };

  const meows = [];

  const getUser = () => {
    console.log('heya heya');
  };

  const getMeows = () => {
    console.log('meow meow meow');
  };

  const getUserData = () => {
    console.log('meow meow meow');
  };

  const match = {
    params: {
      user_name: 'None ya biz'
    }
  };

  ReactDOM.render(
    <AppContext.Provider
      value={{ user, getUser, getMeows, getUserData, meows }}>
      <Router>
        <UserPage match={match} />
      </Router>
    </AppContext.Provider>,
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});
