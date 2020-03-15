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
    if (
      this.props.user.likes && 
      this.props.user.likes.find(
        (like) => like.meow_id === this.props.meow.meow_id
      )
    ) return true;
    else return false;
  }

  componentDidMount() {
    this.context.getMeows();
  }

  likeMeow = () => {
    this.context.likeMeow(this.props.meow.meow_id);
  }

  unlikeMeow = () => {
    this.context.unlikeMeow(this.props.meow.meow_id);
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
