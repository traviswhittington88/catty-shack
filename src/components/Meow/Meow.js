import React, { Component } from 'react'
import AppContext from '../../contexts/appContext'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import './Meow.css'
import MyButton from '../MyButton/MyButton';
import { MdChat } from 'react-icons/md';

class Meow extends Component {
  constructor(props) {
    super(props)
  }
  static contextType = AppContext;


  likedMeow = () => {
    if (
      this.props.user.likes && 
      this.props.user.likes.find(
        (like) => like.meow_id === this.props.meow.meow_id
      )
    )
      return true;
    else return false;
  }
  likeMeow = () => {
    this.props.likeMeow(this.props.meow.meow_id)
  }

  unlikeMeow = () => {
    this.props.unlikeMeow(this.props.meow.meow_id)
  }

  render() {
    dayjs.extend(relativeTime);
    const { meow: { body, date_created, user_image, userHandle, meow_id, likeCount, commentCount } } = this.props
    return (
      <div className="card">
        <img src={`http://localhost:8000/${user_image}`} alt="user profile image" className="meow-image" />
        <div className="meow-container">
          <h4><b>{userHandle}</b></h4>
          <p>{dayjs(date_created).fromNow()}</p>
          <p>{body}</p>
          {/*likeButton*/}
          <span>{likeCount} Likes</span>
          <MyButton tip="comments">
            <MdChat color="primary" />
          </MyButton>
          <span>{commentCount} comments</span>
        </div>
      </div>
    )
  }
}

export default Meow
