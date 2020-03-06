import React, { Component } from 'react'
import SignupForm from '../../components/SignupForm/SignupForm';
import './SignupPage.css'
import Nav from '../../components/Nav/Nav'
//import Footer from '../../components/Footer/Footer'


export default class SignupPage extends Component {
    static defaultProps = {
      history: {
        push: () => {},
      },
    }

    handleSignupSuccess = user => {
      const { history } = this.props
      history.push('/login')
    }
    render() {
      return (
        <>
          <Nav />
          <main role="main">
            <section className='signup-page'>
              <header role="banner" className="signup-page-header">
                <h2>Sign up</h2>
              </header>
              <SignupForm
                onSignupSuccess={this.handleSignupSuccess}
              />
            </section>
          </main>
        </>
      )
    }
}