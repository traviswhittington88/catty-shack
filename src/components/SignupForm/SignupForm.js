import React, { Component } from 'react'
import './SignupForm.css'
import AuthApiService from '../../services/auth-api-service'


export default class SignupForm extends Component {
  static defaultProps = {
      onSignupSuccess: () => {}
  }

  state = { error: null }

  handleSubmit = ev => {
    ev.preventDefault()
    const { user_name, full_name, pseudonym, password } = ev.target
    const newUser = { 
      user_name: user_name.value,
      full_name: full_name.value,
      pseudonym: pseudonym.value, 
      password: password.value, 
    }

    this.setState({ error: null })

    AuthApiService.postUser(newUser)
      .then(user => {
        full_name.value = ''
        pseudonym.value = ''
        user_name.value = ''
        password.value = ''
        this.props.onSignupSuccess()
      })
      .catch(res => {
        this.setState({ error: res.error })
      }) 
  }

  render() {
    const { error } = this.state
    return (
      <form
        className='signup-form'
        onSubmit={this.handleSubmit}
      >
        <div role='alert'>
          {error && <p className='error'>{error}</p>}
        </div>
        <div className='full_name'>
          <label htmlFor='full_name' className="label">*Full name</label>
          <input
            name='full_name'
            type='text'
            required
            id='full_name'
            className="input"
          />
        </div>
        <div className='user_name'>
          <label htmlFor='user_name' className="label">*User name</label>
          <input
            name='user_name'
            type='text'
            required
            id='user_name'
            className="input"
          />
        </div>
        <div className='pseudonym'>
          <label htmlFor='pseudonym' className="label">*Pseudonym</label>
          <input
            name='pseudonym'
            type='text'
            id='pseudonym'
            className="input"
          />
        </div>
        <div className='password'>
          <label htmlFor='password' className="label">*Password</label>
          <input
            name='password'
            type='password'
            required
            id='password'
            className="input"
          />
        </div>
        <button type='submit' className="submit">Sign up</button>
        <div className="list-wrapper">
          <ul className="unordered-list">
            <li>Minimum 8 characters</li>
            <li>One uppercase character</li>
            <li>One lowercase character</li>
            <li>One special character</li>
            <li>One number</li>
          </ul>
        </div>
      </form>
    )
  }
}