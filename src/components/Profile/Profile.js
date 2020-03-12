import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import AppContext from '../../contexts/appContext'
import TokenService from '../../services/token-service'
import dayjs from 'dayjs'
import config from '../../config'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Profile.css'
import { FaTwitter } from 'react-icons/fa';
import { MdLocationOn, MdToday, MdLink, MdEdit} from 'react-icons/md';
import IconButton from '@material-ui/core/IconButton'


export default class Profile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      userData: { 
        id: null, 
        user_name: null, 
        date_created: null, 
        user_image: null, 
        bio: null, 
        location: null, 
        website: null
      },
      error: null
    }
  }
  componentDidMount() {
  fetch(`${config.API_ENDPOINT}api/users`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      'authorization': `bearer ${TokenService.getAuthToken()}`
    }
  })
  .then(res => {
    if(!res.ok) {
      throw new Error(res.statusText)
    }
    return res.json()
  })
  .then(userData => {
    this.setState(
      { userData: 
        { id: userData.user.id, 
          user_name: userData.user.user_name,
          date_created: userData.user.date_created,
          user_image: userData.user.user_image,
          bio: userData.user.bio,
          location: userData.user.location,
          website: userData.user.website
        } 
      }
    )
  })
  .catch(err => { this.setState({ error: err.message })})
  }
  static contextType = AppContext;

  handleImageChange = (event) => {
    const image = event.target.files[0];
    // send to server
  }

  handleEditPicture = () => {
    const fileInput = document.getElementById('upload-image');
    fileInput.click();
  }

  render() {
    const { userData } = this.state;
    return (
      <>
        <div className="profile-card">
          <img 
            src={`http://localhost:8000/${userData.user_image}`} 
            alt="profile picture" 
            className="profile-image"
          />
          <input 
            type="file" 
            id="upload-image"
            hidden="hidden"
            onChange={this.handleImageChange}
          />
          <div class="tooltip">
          <span class="tooltiptext">Tooltip text</span>
            <IconButton
              onClick={this.handleEditPicture} 
              className="edit-image-button"
            >
              <MdEdit />
            </IconButton>
          </div>
          <h2>
            <Link 
              to={`/users/${userData.user_name}`}
            >
              @{userData.user_name}
            </Link>
          </h2>
            <div className="profile-info">
            {userData.bio && 
              <p className="bio">
                {userData.bio}
              </p>
            }
              {/*<div>
              <Link 
                to='#'
                alt="twitter logo" 
                className="icon"
              >
                <FaTwitter/>
              </Link>
              </div> */}
              <div className="location">
              {userData.location && <><MdLocationOn /><span>{userData.location}</span></> }
              </div>
              <div className="website">
              {userData.website && <Link to={`${userData.website}`}><MdLink />{userData.website}</Link>}
              </div>
              <hr />         
              <div className="joined">
                <MdToday />{' '}
                <span>Joined {dayjs(userData.date_created).format('MMM YYYY')}</span>
              </div>
            </div>
          <button className="contact-button">Contact</button>
        </div>
      </>
    )
  }
}
