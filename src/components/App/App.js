import React, { Component } from 'react';
import AppContext from '../../contexts/appContext';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TokenService from '../../services/token-service';
import PrivateRoute from '../Utils/PrivateRoute';
import PublicOnlyRoute from '../Utils/PublicOnlyRoute';
import Footer from '../Footer/Footer';
import HomePage from '../../routes/HomePage/HomePage';
import LoginPage from '../../routes/LoginPage/LoginPage';
import SignupPage from '../../routes/SignupPage/SignupPage';
import LandingPage from '../../routes/LandingPage/LandingPage';
import NotFoundPage from '../../routes/NotFoundPage/NotFoundPage';
import UserPage from '../../routes/UserPage/UserPage';
import './App.css';
import config from '../../config';

export default class App extends Component {
  constructor(props) {
    super(props);

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
        notifications: []
      },
      meows: [],
      meow: {},
      profile: null,
      hasError: false,
      error: { message: null },
      loading: false
    };
  }

  // Set data methods
  setMeows = newMeows => {
    this.setState({ meows: newMeows });
  };

  // GET Methods
  getUserData = user_name => {
    this.setState({ loading: true });
    fetch(`${config.API_ENDPOINT}api/users/${user_name}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${TokenService.getAuthToken()}`
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then(userData => {
        let meows = userData.meows;
        let profile = userData.user;
        this.setState({ meows, profile });
        this.setState({ loading: false });
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  getUser = () => {
    fetch(`${config.API_ENDPOINT}api/users/details`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${TokenService.getAuthToken()}`
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then(userData => {
        const {
          credentials: {
            id,
            user_name,
            date_created,
            user_image,
            bio,
            location,
            website
          },
          likes,
          notifications
        } = userData;
        this.setState({
          user: {
            id,
            user_name,
            date_created,
            user_image,
            bio,
            location,
            website,
            likes,
            notifications
          }
        });
      })
      .catch(err => {
        this.setState({ error: err.message });
      });
  };

  setMeows = () => {
    fetch(`${config.API_ENDPOINT}api/meows`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${TokenService.getAuthToken()}`
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then(meows => {
        this.setState({ meows });
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  getMeow = meow_id => {
    fetch(`${config.API_ENDPOINT}api/meows/${meow_id}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${TokenService.getAuthToken()}`
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then(meowDb => {
        this.setState({ meow: meowDb });
      });
  };

  setMeow = meow_id => {
    fetch(`${config.API_ENDPOINT}api/meows/${meow_id}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${TokenService.getAuthToken()}`
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then(meow => {
        this.setState({ meow });
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  likeMeow = meow_id => {
    // Add Like to likes array
    const newLike = {
      id: null,
      user_name: this.state.user.user_name,
      meow_id: meow_id
    };
    this.state.user.likes.push(newLike);
    // Create a new meows array from state, increment the likeCount on the meow that was liked and replace with old meows array
    const index = this.state.meows.findIndex(meow => meow.meow_id === meow_id);
    let newMeows = this.state.meows;
    newMeows[index].likeCount++;
    this.setState({ meows: newMeows });

    // add the like to the meow in the db
    fetch(`${config.API_ENDPOINT}api/meows/${meow_id}/like`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${TokenService.getAuthToken()}`
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then(resData => {
        // increment the likecount displayed on the meow dialog
        if (resData.meow_id === this.state.meow.meow_id) {
          let newMeow = this.state.meow;
          newMeow.likecount++;
          this.setState({ meow: newMeow });
        }
        // replace the meow in the meows array in state with the new meow object with incremented like count
        let index = this.state.meows.findIndex(
          meow => meow.meow_id === resData.meow_id
        );
        this.setState(this.state.meows[index] === resData);
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  unlikeMeow = meow_id => {
    // find the index of the meow to be unliked
    let index = this.state.meows.findIndex(meow => meow.meow_id === meow_id);
    // decrement the likeCount from the meow that was unliked and replace meows array
    const newMeows = this.state.meows;
    newMeows[index].likeCount--;
    this.setState({ meows: newMeows });
    // remove the like from the likes array
    let newUser = this.state.user;
    const newLikes = newUser.likes.filter(like => like.meow_id !== meow_id);
    newUser.likes = newLikes;
    this.setState({ user: newUser });

    // remove the like from the likes table in the db
    fetch(`${config.API_ENDPOINT}api/meows/${meow_id}/unlike`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${TokenService.getAuthToken()}`
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then(meowData => {
        if (meowData.meow_id === this.state.meow.meow_id) {
          let newMeow = this.state.meow;
          newMeow.likecount--;
          this.setState({ meow: newMeow });
        }
        let index = this.state.meows.findIndex(
          meow => meow.meow_id === meowData.meow_id
        );
        this.setState(this.state.meows[index] === meowData);
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  getMeows = () => {
    fetch(`${config.API_ENDPOINT}api/meows`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${TokenService.getAuthToken()}`
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then(meows => {
        this.setState({ meows });
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  // DELETE Routes

  deleteMeow = meow_id => {
    // delete meow from state
    const newMeows = this.state.meows.filter(meow => meow.meow_id !== meow_id);
    this.setState({ meows: newMeows });
    // dete meow from db
    fetch(`${config.API_ENDPOINT}api/meows/${meow_id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${TokenService.getAuthToken()}`
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .catch(error => this.setState({ error }));
  };

  // POST routes

  markNotificationsRead = notificationIds => {
    console.log(notificationIds);
    // mark notifications read in db
    fetch(`${config.API_ENDPOINT}api/users/notifications`, {
      method: 'POST',
      body: JSON.stringify(notificationIds),
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${TokenService.getAuthToken()}`
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then(() => {
        let updatedNotifications = this.state.user.notifications;
        updatedNotifications.forEach(
          notification => (notification.read = true)
        );
        this.setState({ notifications: updatedNotifications });
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  postComment = (meow_id, comment) => {
    // increment comment count of meow being commented
    const index = this.state.meows.findIndex(meow => meow.meow_id === meow_id);
    let newMeows = this.state.meows;
    newMeows[index].commentCount++;
    this.setState({ meows: newMeows });
    // increment count in meow dialog of meow being displayed
    let newMeow = this.state.meow;
    newMeow.commentcount++;
    this.setState({ meow: newMeow });
    // Post new comment to DB
    fetch(`${config.API_ENDPOINT}api/meows/${meow_id}/comments`, {
      method: 'POST',
      body: JSON.stringify(comment),
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${TokenService.getAuthToken()}`
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then(comment => {
        let newMeow = this.state.meow;
        newMeow.comments.unshift(comment);
        this.setState({ meow: newMeow });
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  uploadImage = formData => {
    fetch(`${config.API_ENDPOINT}api/users/image`, {
      method: 'POST',
      body: formData,
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`
      }
    })
      .then(res => {
        if (!res) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then(user => {
        // update user image of meows owned by the user to reflect new image
        let newMeows = this.state.meows;
        newMeows.forEach(meow => {
          if (meow.userHandle === user.user_name) {
            meow.user_image = user.user_image;
          }
        });

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
        });
      })
      .catch(err => this.setState({ error: err }));
  };

  editUserDetails = details => {
    fetch(`${config.API_ENDPOINT}api/users/details`, {
      method: 'POST',
      body: JSON.stringify(details),
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${TokenService.getAuthToken()}`
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
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
        });
      });
  };

  postMeow = meow => {
    // set loading to true to kick off loading graphic
    this.setState({ loading: true });
    // post meow to meows table in db
    fetch(`${config.API_ENDPOINT}api/meows`, {
      method: 'POST',
      body: JSON.stringify(meow),
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${TokenService.getAuthToken()}`
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then(meow => {
        // we have data, stop loading graphic
        this.setState({ loading: false });
        // add meow to meows array in state
        let newMeows = this.state.meows;
        newMeows.unshift(meow);
        this.setState({ meows: newMeows });
      });
  };

  static getDerivedStateFromError(error) {
    console.error(error);
    return { hasError: true };
  }

  render() {
    const contextValue = {
      loading: this.state.loading,
      meows: this.state.meows,
      meow: this.state.meow,
      notifications: this.state.user.notifications,
      getUser: this.getUser,
      markNotificationsRead: this.markNotificationsRead,
      getUserData: this.getUserData,
      getMeows: this.getMeows,
      getMeow: this.getMeow,
      likeMeow: this.likeMeow,
      unlikeMeow: this.unlikeMeow,
      deleteMeow: this.deleteMeow,
      postMeow: this.postMeow,
      postComment: this.postComment,
      editUserDetails: this.editUserDetails,
      setMeows: this.setMeows,
      setMeow: this.setMeow,
      user: this.state.user,
      uploadImage: this.uploadImage
    };
    return (
      <AppContext.Provider value={contextValue}>
        <div className='App'>
          <header className='App__header'></header>
          <main className='App__main'>
            {this.state.hasError && (
              <p className='errorText'>{this.state.err}</p>
            )}
            <Router>
              <Switch>
                <Route exact path='/' component={LandingPage} />
                <Route exact path='/home' component={HomePage} />{' '}
                {/* make private later */}
                <Route path='/login' component={LoginPage} />
                <Route path='/signup' component={SignupPage} />
                <Route exact path='/users/:user_name' component={UserPage} />
                <Route
                  path='/users/:user_name/meows/:meow_id'
                  component={UserPage}
                />
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
