import React, { Component } from 'react';
import AppContext from '../../contexts/appContext';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import './Meow.css';
import MyButton from '../MyButton/MyButton';
import { MdChat, MdFavorite, MdFavoriteBorder } from 'react-icons/md';
import DeleteMeow from '../DeleteMeow/DeleteMeow';
import MeowDialog from '../MeowDialog/MeowDialog';
import LikeButton from '../LikeButton/LikeButton'

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

  


  render() {
    dayjs.extend(relativeTime);
    const { meow: { body, date_created, user_image, userHandle, meow_id, likeCount, commentCount } } = this.props;

    return (
      <div className="card">
        <img src={`http://localhost:8000/${user_image}`} alt="user profile image" className="meow-image" />
        <div className="meow-container">
          <h4><b>{userHandle}</b></h4>
          <p>{dayjs(date_created).fromNow()}</p>
          <p>{body}</p>
          <LikeButton meow_id={meow_id}/>
          <span>{likeCount} likes</span>
          <MyButton tip="Comment" tipClassName='tooltipnav'>
            <MdChat color="primary" />
          </MyButton>
          <span>{commentCount} comments</span>
        </div>
        { userHandle === this.props.user.user_name  && 
          <DeleteMeow meow_id={meow_id} />
        }
        <MeowDialog meow_id={meow_id} userHandle={userHandle} />
      </div>
    )
  }
}

export default Meow
