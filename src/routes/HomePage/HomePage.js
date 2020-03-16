import React, { Component } from 'react'
import AppContext from '../../contexts/appContext'
import Nav from '../../components/Nav/Nav'
import Meow from '../../components/Meow/Meow'
import Profile from '../../components/Profile/Profile'
import TokenService from '../../services/token-service'
import config from '../../config'
import './HomePage.css'

export default class HomePage extends Component {
  constructor(props) {
    super(props)
  }

  static contextType = AppContext;



  componentDidMount() { 
     this.context.getMeows();
  }

    render() {
        return (
          <AppContext.Consumer>
            {(value) => {     
              let recentMeowsMarkup = value.meows ? (
              value.meows.map(meow => <Meow key={meow.meow_id} meow_id={meow.meow_id} meow={meow} user={value.user} />)
              ) : <p>Loading ...</p>

              return (
                <>
                  <Nav />
                    <main role="main">
                      <div className="homepage">
                        <div className="container grid-2 center">
                          <div className="meow-list">
                            {recentMeowsMarkup}
                          </div>
                          <div>
                          <Profile user={value.user} />
                          </div>
                        </div>
                      </div>
                    </main>
                </>
              )
            }}
          </AppContext.Consumer>
        )
    }
}
