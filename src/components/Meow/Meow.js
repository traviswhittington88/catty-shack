import React, { Component } from 'react';
import AppContext from '../../contexts/appContext';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import './Meow.css';
import MyButton from '../MyButton/MyButton';
import { MdChat, MdFavorite, MdFavoriteBorder } from 'react-icons/md';
import DeleteMeow from '../DeleteMeow/DeleteMeow';

class Meow extends Component {
  constructor(props) {
    super(props)

    this.state = {
      likes: '',
      liked: false,
      error: null,
    }
  }
  static contextType = AppContext;

  likedMeow = () => {
    console.log(this.props.user.likes)
    if (
      this.props.user.likes && 
      this.props.user.likes.find(
        (like) => like.meow_id === this.props.meow.meow_id
      )
    ) return true;
    else return false;
  }

  likeMeow = () => {
    console.log('likeMeowCalled')
    this.context.likeMeow(this.props.meow_id);
  }

  unlikeMeow = () => {
    console.log('unlikeMeow called')
    this.context.unlikeMeow(this.props.meow_id);
  }

  render() {
    dayjs.extend(relativeTime);
    const { meow: { body, date_created, user_image, userHandle, meow_id, likeCount, commentCount } } = this.props;
    
    let likeButton = this.likedMeow() ? (
      <MyButton tip="Undo like" tipClassName='tooltipnav' onClick={this.unlikeMeow}>
        <MdFavorite />
      </MyButton>
    ) : (
      <MyButton tip="Like" tipClassName='tooltipnav' onClick={this.likeMeow}>
        <MdFavoriteBorder />
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
        { userHandle === this.props.user.user_name  && 
          <DeleteMeow meow_id={meow_id} />
        }
      </div>
    )
  }
}

export default Meow
