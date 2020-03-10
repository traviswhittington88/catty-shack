import React, { Component } from 'react';
import AppContext from '../../contexts/appContext'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import TokenService from '../../services/token-service'
import PrivateRoute from '../Utils/PrivateRoute'
import PublicOnlyRoute from '../Utils/PublicOnlyRoute'
import Footer from '../Footer/Footer'
import HomePage from '../../routes/HomePage/HomePage'
import LoginPage from '../../routes/LoginPage/LoginPage'
import SignupPage from '../../routes/SignupPage/SignupPage'
import LandingPage from '../../routes/LandingPage/LandingPage'
import NotFoundPage from '../../routes/NotFoundPage/NotFoundPage'
import './App.css';
import config from '../../config';

// services 
import UserService from '../../services/userService'

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      userData : {},
      hasError: false,
      error: { message: null }
    }
  }

  updateUserData = () => {
    console.log('updateUserData called');
    fetch(`${config.API_ENDPOINT}api/users`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      }
    })
    .then(res => {
      if (!res.ok) {
        throw new Error(res.statusText)
      }
      return res.json()
    })
    .then(userData=> {
      this.setState({ userData })
      console.log(this.state.userData)
    })
  }
 
  static getDerivedStateFromError(error) {
    console.error(error)
    return { hasError: true }
  }

  render() {
    const contextValue = {
      userData: this.state.userData,
      updateUserData: this.updateUserData
    }
    return (
      <AppContext.Provider value={contextValue}>
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
      </AppContext.Provider>
    );
  }
}
