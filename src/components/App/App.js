import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import PrivateRoute from '../Utils/PrivateRoute'
import PublicOnlyRoute from '../Utils/PublicOnlyRoute'
import Nav from '../Nav/Nav'
import Footer from '../Footer/Footer'
import HomePage from '../../routes/HomePage/HomePage'
import LoginPage from '../../routes/LoginPage/LoginPage'
import SignupPage from '../../routes/SignupPage/SignupPage'
import LandingPage from '../../routes/LandingPage/LandingPage'
import NotFoundPage from '../../routes/NotFoundPage/NotFoundPage'
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      hasError: false,
      error: { message: null }
    }
  }
 
  static getDerivedStateFromError(error) {
    console.error(error)
    return { hasError: true }
  }

  render() {
    return (
      <div className='App'>
        <header className='App__header'></header>
        <main className='App__main'>
        {this.state.hasError && <p className='errorText'>{this.state.err}</p>}
          <Router>
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <Route exact path="/home" component={HomePage} />  {/* make private later */}
              <Route exact path="/login" component={LoginPage} />
              <Route exact path="/signup" component={SignupPage} />
              <Route component={NotFoundPage} />
            </Switch>
            <Footer />
          </Router>
        </main>
      </div>
    );
  }
}
