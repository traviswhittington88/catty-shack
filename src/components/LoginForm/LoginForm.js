import React, { Component } from 'react'
import TokenService from '../../services/token-service'
import AuthApiService from '../../services/auth-api-service'
import './LoginForm.css'

export default class LoginForm extends Component {
  static defaultProps = {
    onLoginSuccess: () => {}
  }

  state = { error: null }

  handleSubmitBasicAuth = ev => {
    ev.preventDefault()
    const { user_name, password } = ev.target

    TokenService.saveAuthToken(
      TokenService.makeBasicAuthToken(user_name.value, password.value)
    )

    user_name.value = ''
    password.value = ''
    this.props.onLoginSuccess()
  }

  handleSubmitJwtAuth = ev => {
    ev.preventDefault()
    this.setState({ error: null })
    const { user_name, password } = ev.target

    AuthApiService.postLogin({
      user_name: user_name.value,
      password: password.value,
    })
      .then(res => {
        user_name.value = ''
        password.value = ''
        TokenService.saveAuthToken(res.authToken)
        TokenService.saveUserId(res.id)
        this.props.onLoginSuccess()
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
  } 

  bypassLogin = ev => {
    this.props.onLoginSuccess()
  }

  render() {
    const { error } = this.state
    return (
      <form
        className='login-form'
        onSubmit={this.handleSubmitJwtAuth}
      >
        <div role='alert'>
            {error && <p className='error'>{error}</p>}
        </div>
        <div className='username'>
          <label htmlFor='username' id="label">
            *User name 
          </label>
          <input
            type='text'
            name='user_name'
            id='user_name'
            className="input"
            required
          />
        </div>
        <div className='password'>
          <label htmlFor='password' id="label">
            *Password 
          </label>
          <input 
            type='password'
            name='password'
            id='password'
            className="input"
            required
          />
        </div>
        <button type='submit' id="submit">
          Login
        </button>
      </form>
    )
  }



}