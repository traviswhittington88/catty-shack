import React, { Component } from 'react';
import Nav from '../../components/Nav/Nav';
import AppContext from '../../contexts/appContext';
import config from '../../config';
import TokenService from '../../services/token-service';
import Meow from '../../components/Meow/Meow';
import MeowSkeleton from '../../components/MeowSkeleton/MeowSkeleton';
import StaticProfile from '../../components/StaticProfile/StaticProfile';

class UserPage extends Component {
  static contextType = AppContext;

  state = {
    user: {
      id: '',
      user_name: '',
      date_created: '',
      user_image: '',
      bio: '',
      location: '',
      website: ''
    },
    meow_id_param: null,
    openDialog: false
  };

  componentDidMount() {
    const user_name = this.props.match.params.user_name;
    const meow_id = this.props.match.params.meow_id;

    if (meow_id) this.setState({ meow_id_param: meow_id, openDialog: true });

    this.context.getUserData(user_name);

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
        const {
          user: {
            id,
            user_name,
            date_created,
            user_image,
            bio,
            location,
            website
          }
        } = userData;
        this.setState({
          user: {
            id,
            user_name,
            date_created,
            user_image,
            bio,
            location,
            website
          }
        });
      })
      .catch(error => {
        this.setState({ error });
      });
  }

  render() {
    const { meow_id_param, openDialog } = this.state;
    return (
      <AppContext.Consumer>
        {value => {
          let user = this.state.user;
          let meowsMarkup = this.context.loading ? (
            <MeowSkeleton />
          ) : value.meows === null ? (
            <p>No meows from this user</p>
          ) : !meow_id_param ? (
            value.meows.map(meow => (
              <Meow
                key={meow.meow_id}
                meow_id={meow.meow_id}
                meow={meow}
                user={user}
              />
            ))
          ) : (
            value.meows.map(meow => {
              if (meow.meow_id.toString() !== meow_id_param.toString()) {
                return (
                  <Meow
                    key={meow.meow_id}
                    meow_id={meow.meow_id}
                    meow={meow}
                    user={user}
                  />
                );
              } else {
                return (
                  <Meow
                    key={meow.meow_id}
                    meow_id={meow_id_param}
                    meow={meow}
                    user={user}
                    openDialog={openDialog}
                  />
                );
              }
            })
          );

          return (
            <>
              <Nav />
              <main role='main'>
                <div className='userpage'>
                  <div className='container center'>
                    <div className='meow-list'>{meowsMarkup}</div>
                    <div className='profile-card-container'>
                      {this.state.user === null ? (
                        <p>Loading profile...</p>
                      ) : (
                        <StaticProfile user={user} />
                      )}
                    </div>
                  </div>
                </div>
              </main>
            </>
          );
        }}
      </AppContext.Consumer>
    );
  }
}
export default UserPage;
