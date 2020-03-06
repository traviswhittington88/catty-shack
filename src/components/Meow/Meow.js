import React, { Component } from 'react'
import './Meow.css'

class Meow extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { meow: { body, date_created, user_image, userHandle, meow_id, likeCount, commentCount } } = this.props
    console.log(user_image)
    return (
      <div className="card">
        <img src={`http://localhost:8000/${user_image}`} alt="user profile image" className="meow-image" />
        <div className="meow-container">
          <h4><b>{userHandle}</b></h4>
          <p>{date_created}</p>
          <p>{body}</p>
        </div>
      </div>
    )
  }
}

export default Meow
