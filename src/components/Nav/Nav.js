import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TokenService from '../../services/token-service';
import MyButton from '../MyButton/MyButton';
import './Nav.css';
import logo from '../../images/logo.png';
import PostMeow from '../PostMeow/PostMeow';
import Notifications from '../Notifications/Notifications';

export default class Nav extends Component {
  handleLogoutClick = () => {
    TokenService.clearAuthToken();
  };

  renderLogoutLink() {
    return (
      <>
        <PostMeow />
        <MyButton tip='Meowifications' tipClassName='tooltipnav'>
          <Notifications />
        </MyButton>
        <div className='item logout'>
          <Link onClick={this.handleLogoutClick} to='/'>
            Logout
          </Link>
        </div>
      </>
    );
  }

  renderLoginLink() {
    return (
      <>
        <div className='item signup'>
          <Link to='/signup'>Sign up</Link>
        </div>
        <div className='item login'>
          <Link to='/login'>Login</Link>
        </div>
      </>
    );
  }

  render() {
    return (
      <nav role='navigation' className='nav bg-light'>
        <div className='item name'>
          <Link to='/home' className='title'>
            <img
              src={require({ logo })}
              alt='catty shack logo'
              className='logo'></img>
          </Link>
        </div>
        {TokenService.hasAuthToken()
          ? this.renderLogoutLink()
          : this.renderLoginLink()}
      </nav>
    );
  }
}
