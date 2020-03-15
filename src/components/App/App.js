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

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      user: { 
        id: '', 
        user_name: '', 
        date_created: '', 
        user_image: '', 
        bio: '', 
        location: '',
        website: '',
        likes: [],
        notifications: [],
      },
      meows: [],
      meow: [],
      hasError: false,
      error: { message: null }
    }
  }

  updloadImage = (formData) => {
  fetch(`${config.API_ENDPOINT}api/users/image`, {
    method: 'POST',
    body: formData,
    headers: {
      'authorization': `bearer ${TokenService.getAuthToken()}`,
    }
  })
  .then(res => {
    if (!res) {
      throw new Error(res.statusText)
    }
    return res.json()
  })
  .then(user => {
    this.setState({ 
      UserService: {
      id: user.id, 
      user_name: user.user_name,
      date_created: user.date_created,
      user_image: user.user_image,
      bio: user.bio,
      location: user.location,
      website: user.website
    }
    })
  })
  .catch(err => console.log(err));
}


  getUser = () => {
  fetch(`${config.API_ENDPOINT}api/users/details`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      'authorization': `bearer ${TokenService.getAuthToken()}`
    }
  })
  .then(res => {
    if(!res.ok) {
      throw new Error(res.statusText)
    }
    return res.json()
  })
  .then(userData => {
    console.log(userData)
    const { 
      credentials: 
        { id, user_name, date_created, user_image, bio, location, website}, 
      likes,
      notifications,
    } = userData
    this.setState(
      { user: 
        { id, 
          user_name,
          date_created,
          user_image,
          bio,
          location,
          website,
          likes,
          notifications
        } 
      }
    ) 
  })
  .catch(err => { this.setState({ error: err.message })})
}

editUserDetails = (details) => {
  fetch(`${config.API_ENDPOINT}api/users/details`, {
    method: 'POST',
    body: JSON.stringify(details),
    headers: {
      'content-type': 'application/json',
      'authorization': `bearer ${TokenService.getAuthToken()}`
    }
  })
  .then(res => {
    if (!res.ok) {
      throw new Error(res.statusText)
    }
    return res.json()
  })
  .then(user => {
    this.setState({ 
      user: {
        id: user.id, 
        user_name: user.user_name,
        date_created: user.date_created,
        user_image: user.user_image,
        bio: user.bio,
        location: user.location,
        website: user.website
      }
    })
  })
}

  setMeows = () => {
    fetch(`${config.API_ENDPOINT}api/meows`, {
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
    .then(meows => {
      this.setState({ meows })
    })
    .catch(error => {
      this.setState({ error })
    })
  }

  setMeow = (meow_id) => {
    fetch(`${config.API_ENDPOINT}api/meows/${meow_id}`, {
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
    .then(meow => {
      this.setState({ meow })
    })
    .catch(error => {
      this.setState({ error })
    })
  }

  likeMeow = (meow_id) => {
    fetch(`${config.API_ENDPOINT}api/meows/${meow_id}/like`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`
      }
    })
    .then(res => {
      if (!res.ok) {
        throw new Error(res.statusText)
      }
      return res.json()
    })
    .then(meow => {
      let index = this.state.meows.findIndex(meow => meow.meow_id === meow.meow_id)
      this.setState(this.state.meows[index] === meow)
    })
    .catch(error => {
      this.setState({ error })
    })
  }

  unlikeMeow = (meow_id) => {
    fetch(`${config.API_ENDPOINT}api/meows/${meow_id}/unlike`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`
      }
    })
    .then(res => {
      if (!res.ok) {
        throw new Error(res.statusText)
      }
      return res.json()
    })
    .then(meow => {
      let index = this.state.meows.findIndex(meow => meow.meow_id === meow.meow_id)
      this.setState(this.state.meows[index] === meow)
    })
    .catch(error => {
      this.setState({ error })
    })
  }

  getMeows = () => {
    fetch(`${config.API_ENDPOINT}api/meows`, {
      method: 'GET', 
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`
      }
    })
    .then(res => {
      if (!res.ok) {
        throw new Error(res.statusText) 
      }
      return res.json()
    })
    .then(meows => {
      this.setState({ meows })
    })
    .catch(error => {
      this.setState({ error })
    })
  }
 
  static getDerivedStateFromError(error) {
    console.error(error)
    return { hasError: true }
  }

  render() {
    const contextValue = {
      meows: this.state.meows,
      getMeows: this.getMeows,
      getUser: this.getUser,
      editUserDetails: this.editUserDetails,
      likeMeow: this.likeMeow,
      unlikeMeow: this.unlikeMeow,
      userData: this.state.user,
      uploadImage: this.uploadImage,
      getUserData: this.getUserData
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
