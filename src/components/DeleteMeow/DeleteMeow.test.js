import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom';
import DeleteMeow from './DeleteMeow'

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(<Router><DeleteMeow /></Router>, div);

  ReactDOM.unmountComponentAtNode(div);
});