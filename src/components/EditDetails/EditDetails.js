import React, { Component } from 'react'
import config from '../../config'
import TokenService from '../../services/token-service'
import AppContext from '../../contexts/appContext'
import IconButton from '@material-ui/core/IconButton'
import { MdEdit} from 'react-icons/md';
import { Link } from 'react-router-dom'
import TextField from '@material-ui/core/TextField';

export class EditDetails extends Component {
  static contextType = AppContext; 
  constructor(props) {
    super(props) 
    this.state = {
      bio: '',
      website: '',
      location: '',
      open: false
    }
  }
  
  mapUserDetailsToState = (details) => {
    this.setState({
      bio: details.bio ? details.bio : '',
      website: details.website ? details.website : '',
      location: details.location ? details.location : '',
    })
  }
 
  componentDidMount() {
    const { details } = this.props
    this.mapUserDetailsToState(details);
  } 
 
  toggleDialog = () => {
    this.setState(prevState => ({
      open: !prevState.open
    }));
  }

  handleChange = () => {

  }

  handleSubmit = () => {
    const userDetails = {
      bio: this.state.bio,
      website: this.state.website,
      location: this.state.location,
    }

    this.context.editUserDetails(userDetails)
    this.toggleDialog()
  }

  render() {
    console.log(this.state.bio)
    return (
    <>
      <div className="tooltip">
        <span className="tooltiptext">Edit user details</span>
        <IconButton
          onClick={this.toggleDialog} 
          className="edit-user-details-button"
        >
          <MdEdit />
        </IconButton>
      </div>
      <div id="dialog">
        <div>
          { this.state.open && 
            <form>
              <TextField
                name="bio"
                type="text"
                label="bio"
                multiline
                rows="3"
                placeholder="A short bio about yourself"
                className="textfield"
                value={this.state.bio}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                name="website"
                type="text"
                label="website"
                placeholder="Your website"
                className="textfield"
                value={this.state.website}
                onChange={this.handleChange}
                fullWidth
              /> 
              <TextField
                name="location"
                type="text"
                label="location"
                placeholder="Where you live"
                className="textfield"
                value={this.state.location}
                onChange={this.handleChange}
                fullWidth
              />
              <button 
              onClick={this.toggleDialog}
            >
              Cancel
            </button>
            <button 
              onClick={this.handleSubmit}
            >
              Save
            </button>
            </form>
            
          }
        </div>
      </div>
    </>
    )
  }
}

export default EditDetails
