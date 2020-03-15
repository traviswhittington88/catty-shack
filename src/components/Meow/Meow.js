import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../../contexts/appContext';
import config from '../../config'
import TokenService from '../../services/token-service'
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import './Meow.css';
import MyButton from '../MyButton/MyButton';
import { MdChat, MdFavorite, MdFavoriteBorder } from 'react-icons/md';

class Meow extends Component {
  constructor(props) {
    super(props)

    this.state = {
      likes: '',
      error: null,
    }
  }
  static contextType = AppContext;

  likedMeow = () => {

  }


  componentDidMount() {
    fetch(`${config.API_ENDPOINT}api/meows/${this.props.meow.meow_id}/likes`, {
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
    .then(likes => {
      this.setState({likes})
    })
    .catch(error => {
      this.setState({ error })
    })
  }


  likeMeow = () => {
    this.props.likeMeow(this.props.meow.meow_id);
  }

  unlikeMeow = () => {
    this.props.unlikeMeow(this.props.meow.meow_id);
  }

  render() {
    dayjs.extend(relativeTime);
    const { meow: { body, date_created, user_image, userHandle, meow_id, likeCount, commentCount } } = this.props;
    
    let likeButton = this.likedMeow() ? (
      <MyButton tip="Undo like" tipClassName='tooltipnav' onClick={this.unlikeMeow}>
        <MdFavorite color="primary" />
      </MyButton>
    ) : (
      <MyButton tip="Like" tipClassName='tooltipnav' onClick={this.likeMeow}>
        <MdFavoriteBorder color="primary" />
      </MyButton>
    ) 

    return (
      <div className="card">
        <img src={`http://localhost:8000/${user_image}`} alt="user profile image" className="meow-image" />
        <div className="meow-container">
          <h4><b>{userHandle}</b></h4>
          <p>{dayjs(date_created).fromNow()}</p>
          <p>{body}</p>
          {likeButton}
          <span>{likeCount} Likes</span>
          <MyButton tip="comments">
            <MdChat color="primary" />
          </MyButton>
          <span>{commentCount} Comments</span>
        </div>
      </div>
    )
  }
}

export default Meow
