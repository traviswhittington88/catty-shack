import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import HomePage from '../../routes/HomePage/HomePage'
import LoginPage from '../../routes/LoginPage/LoginPage'
import SignupPage from '../../routes/SignupPage/SignupPage'
import LandingPage from '../../routes/LandingPage/LandingPage'

import './App.css';

function App() {
  return (
    <main className='App'>
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/signup" component={SignupPage} />
          <Route exact path="/landing" component={LandingPage} />
        </Switch>
      </Router>
      <h1>Our App</h1>
    </main>
  );
}

export default App;