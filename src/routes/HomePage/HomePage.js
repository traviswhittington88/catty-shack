import React, { Component } from 'react'
import AppContext from '../../contexts/appContext'
import Nav from '../../components/Nav/Nav'
import Meow from '../../components/Meow/Meow'
import TokenService from '../../services/token-service'
import config from '../../config'
import './HomePage.css'

export default class HomePage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      meows: null,
      error: null
    }
  }
  
  static contextType = AppContext;

  componentDidMount() {
    fetch(`${config.API_ENDPOINT}api/meows`, {
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
    .then(meows => {
      this.setState({ meows })
    })
    .catch(err => { this.setState({ error: err.message })})
      console.log(this.state.meows)
    }

    render() {
        let recentMeowsMarkup = this.state.meows ? (
          this.state.meows.map(meow => <Meow key={meow.meow_id} meow={meow} />)
        ) : <p>Loading ...</p>
        return (
          <AppContext.Consumer>
            {(value => {
              console.log(value)
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
                            <p>Profile</p>
                          </div>
                        </div>
                      </div>
                    </main>
                </>
              )
            })}
          </AppContext.Consumer>
        )
    }
}
