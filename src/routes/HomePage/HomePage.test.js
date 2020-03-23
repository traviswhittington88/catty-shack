import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import HomePage from './HomePage';
import AppContext from '../../contexts/appContext';

it('renders without crashing', () => {
  const div = document.createElement('div');

  const user = {
    user_image: ''
  };

  const getUser = () => {
    console.log('heya heya');
  };

  const getMeows = () => {
    console.log('meow meow meow');
  };

  ReactDOM.render(
    <AppContext.Provider value={{ user, getUser, getMeows }}>
      <Router>
        <HomePage />
      </Router>
    </AppContext.Provider>,
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});
