import React, { Component } from 'react';
import AppContext from '../../contexts/appContext';
import Nav from '../../components/Nav/Nav';
import Meow from '../../components/Meow/Meow';
import Profile from '../../components/Profile/Profile';
import './HomePage.css';

export default class HomePage extends Component {
  constructor(props) {
    super(props);
  }

  static contextType = AppContext;

  componentDidMount() {
    this.context.getMeows();
  }

  render() {
    return (
      <AppContext.Consumer>
        {value => {
          let recentMeowsMarkup = value.meows ? (
            value.meows.map(meow => (
              <Meow
                key={meow.meow_id}
                meow_id={meow.meow_id}
                meow={meow}
                user={value.user}
              />
            ))
          ) : (
            <p>Loading ...</p>
          );

          return (
            <>
              <Nav />
              <main role='main'>
                <div className='homepage'>
                  <div className='container center'>
                    {' '}
                    <div className='meow-list'>{recentMeowsMarkup}</div>
                    <div className='profile-card-container'>
                      <Profile user={value.user} />
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
