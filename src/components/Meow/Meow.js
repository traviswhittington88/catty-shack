import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../../contexts/appContext';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import './Meow.css';
import MyButton from '../MyButton/MyButton';
import { MdChat } from 'react-icons/md';
import DeleteMeow from '../DeleteMeow/DeleteMeow';
import MeowDialog from '../MeowDialog/MeowDialog';
import LikeButton from '../LikeButton/LikeButton';
import config from '../../config';

class Meow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      likes: '',
      liked: false,
      error: null
    };
  }
  static contextType = AppContext;

  render() {
    console.log('props', this.props.openDialog);
    dayjs.extend(relativeTime);
    const {
      meow: {
        body,
        date_created,
        user_image,
        userHandle,
        meow_id,
        likeCount,
        commentCount
      }
    } = this.props;

    return (
      <>
        <div className='card'>
          <img
            src={`${config.API_ENDPOINT}${user_image}`}
            alt='user profile'
            className='meow-image'
          />
          <div className='meow-container'>
            <h4>
              <b>
                {' '}
                <Link to={`/users/${userHandle}`}>@{userHandle}</Link>
              </b>
            </h4>
            <p>{dayjs(date_created).fromNow()}</p>
            <p>{body}</p>
            <LikeButton meow_id={meow_id} />
            <span>{likeCount} likes</span>
            <MyButton tip='Comment' tipClassName='tooltipnav'>
              <MdChat color='primary' />
            </MyButton>
            <span>{commentCount} comments</span>
          </div>
          {userHandle === this.props.user.user_name && (
            <DeleteMeow meow_id={meow_id} />
          )}
          <MeowDialog
            meow_id={meow_id}
            userHandle={userHandle}
            openDialog={this.props.openDialog}
          />
        </div>
      </>
    );
  }
}

export default Meow;
