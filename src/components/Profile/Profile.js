import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import EditDetails from '../../components/EditDetails/EditDetails'
import AppContext from '../../contexts/appContext'
import TokenService from '../../services/token-service'
import dayjs from 'dayjs'
import config from '../../config'
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Profile.css'
//import { FaTwitter } from 'react-icons/fa';
import { MdLocationOn, MdToday, MdLink, MdEdit} from 'react-icons/md';
import IconButton from '@material-ui/core/IconButton'


export default class Profile extends Component {

  constructor(props) {
    super(props)

    this.state = {
      error: null
    }
    
  }
  static contextType = AppContext;

  componentDidMount() {
  this.context.getUser();
  }

  handleUploadImage = (formData) => {
    this.context.uploadImage(formData);
  }

  handleImageChange = (event) => {
    const image = event.target.files[0];
    // send to server
    const formData = new FormData()
    formData.append('profileImage', image, image.name);
    this.handleUploadImage(formData)
  }

  handleEditPicture = () => {
    const fileInput = document.getElementById('upload-image');
    fileInput.click();
  }

  render() {
    return (
      <AppContext.Consumer> 
        {(value)=> {
          return (
            <>
              <div className="profile-card">
                <img 
                  src={`http://localhost:8000/${value.userData.user_image}`} 
                  alt="profile" 
                  className="profile-image"
                />
                <input 
                  type="file" 
                  id="upload-image"
                  hidden="hidden"
                  onChange={this.handleImageChange}
                />
                <div className="tooltip">
                <span className="tooltiptext">Edit profile picture</span>
                  <IconButton
                    onClick={this.handleEditPicture} 
                    className="edit-image-button"
                  >
                    <MdEdit />
                  </IconButton>
                </div>
                <h2>
                  <Link 
                    to={`/users/${value.userData.user_name}`}
                  >
                    @{value.userData.user_name}
                  </Link>
                </h2>
                  <div className="profile-info">
                    {value.userData.bio && 
                      <p className="bio">
                        {value.userData.bio}
                      </p>
                    }
                    <div className="location">
                    {value.userData.location && <><MdLocationOn /><span>{value.userData.location}</span></> }
                    </div>
                    <div className="website">
                    {value.userData.website && <Link to={`${value.userData.website}`}><MdLink />{value.userData.website}</Link>}
                    </div>
                    <hr />         
                    <div className="joined">
                      <MdToday />{' '}
                      <span>Joined {dayjs(value.userData.date_created).format('MMM YYYY')}</span>
                    </div>
                    <EditDetails details={value.userData} />
                  </div>
                <button className="contact-button">Contact</button>
              </div>
            </>
          )
        }}
      </AppContext.Consumer>
    )
  }
}
