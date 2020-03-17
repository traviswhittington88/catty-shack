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
import { MdWork } from 'react-icons/md';

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
      error: { message: null },
      loading: false,
    }
  }

  uploadImage = (formData) => {
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
    // update user image of meows owned by the user to reflect new image
    console.log(user)
    let newMeows = this.state.meows
    newMeows.map(meow => {
      if (meow.userHandle === user.user_name) {
        meow.user_image = user.user_image;
      }
    })

    console.log(newMeows)

    //this.setState({ meows: newMeows })

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
    const { meows } = this.state
    // Add Like to likes array
    const newLike = { id: null, user_name: this.state.user.user_name, meow_id: meow_id }
    this.state.user.likes.push(newLike);
    // Create a new meows array from state, increment the likeCunt on the meow that was liked and replace with old meows array
    const index = this.state.meows.findIndex(meow => meow.meow_id === meow_id)
    let newMeows = this.state.meows
    newMeows[index].likeCount++
    this.setState({ meows: newMeows })

    // add the like to the meow in the db
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
    .then(resData => {
      let index = this.state.meows.findIndex(meow => meow.meow_id === resData.meow_id)
      this.setState(this.state.meows[index] === resData)
    
    })
    .catch(error => {
      this.setState({ error })
    })
  }

  unlikeMeow = (meow_id) => {
    // find the index of the meow to be unliked
    let index = this.state.meows.findIndex(meow => meow.meow_id === meow_id);
    // decrement the likeCount from the meow that was unliked and replace meows array 
    const newMeows = this.state.meows
    newMeows[index].likeCount--
    this.setState({ meows: newMeows })
    // remove the like from the likes array
    let newUser = this.state.user
    const newLikes = newUser.likes.filter(like => like.meow_id !== meow_id)
    newUser.likes = newLikes
    this.setState({ user: newUser }) 

    // remove the like from the likes table in the db
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

  deleteMeow = (meow_id) => {
    // delete meow from state
    const newMeows = this.state.meows.filter(meow => meow.meow_id !== meow_id)
    this.setState({ meows: newMeows })
    // dete meow from db
    fetch(`${config.API_ENDPOINT}api/meows/${meow_id}`, {
      method: 'DELETE',
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
    .catch(error => this.setState({ error }))
  
  }

  postMeow = (meow) => {
    console.log('postMeow called', meow)
    // set loading to true to kick off loading graphic
    this.setState({ loading: true })
    // post meow to meows table in db
    fetch(`${config.API_ENDPOINT}api/meows/`, {
      method: 'POST',
      body: JSON.stringify(meow),
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
      console.log('meow returned from db', meow)
      // we have data, stop loading graphic
      this.setState({ loading: false })
      // add meow to meows array in state
      let newMeows = this.state.meows;
      newMeows.unshift(meow)
      console.log('newMeows after adding the meow', newMeows)
      this.setState({ meows: newMeows })
    })
  }
 
  static getDerivedStateFromError(error) {
    console.error(error)
    return { hasError: true }
  }

  render() {
    const contextValue = {
      loading: this.state.loading,
      meows: this.state.meows,
      getMeows: this.getMeows,
      deleteMeow: this.deleteMeow,
      postMeow: this.postMeow,
      getUser: this.getUser,
      editUserDetails: this.editUserDetails,
      likeMeow: this.likeMeow,
      unlikeMeow: this.unlikeMeow,
      setMeows: this.setMeows,
      setMeow: this.setMeow,
      user: this.state.user,
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
