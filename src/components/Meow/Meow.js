import React, { Component } from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import './Meow.css'

class Meow extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    dayjs.extend(relativeTime);
    const { meow: { body, date_created, user_image, userHandle, meow_id, likeCount, commentCount } } = this.props
    console.log(user_image)
    return (
      <div className="card">
        <img src={`http://localhost:8000/${user_image}`} alt="user profile image" className="meow-image" />
        <div className="meow-container">
          <h4><b>{userHandle}</b></h4>
          <p>{dayjs(date_created).fromNow()}</p>
          <p>{body}</p>
        </div>
      </div>
    )
  }
}

export default Meow