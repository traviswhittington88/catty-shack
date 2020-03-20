import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import EditDetails from '../../components/EditDetails/EditDetails';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { MdLocationOn, MdToday, MdLink, MdEdit } from 'react-icons/md';
import IconButton from '@material-ui/core/IconButton';

export class StaticProfile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      user: { id, user_name, user_image, bio, location, website, date_created }
    } = this.props;
    const user = this.props;
    return (
      <Fragment>
        <div className='profile-card'>
          <img
            src={`http://localhost:8000/${user_image}`}
            alt='profile'
            className='profile-image'
          />
          <h2>
            <Link to={`users/${user_name}`}>@{user_name}</Link>
          </h2>
          <div className='profile-info'>
            {bio && <p className='bio'>{bio}</p>}
            <div className='location'>
              {location && (
                <>
                  <MdLocationOn />
                  <span>{location}</span>
                </>
              )}
            </div>
            <div className='website'>
              {website && (
                <Link to={`${website}`}>
                  <MdLink />
                  {website}
                </Link>
              )}
            </div>
            <hr />
            <div className='joined'>
              <MdToday />{' '}
              <span>Joined {dayjs(date_created).format('MMM YYYY')}</span>
            </div>
            <EditDetails details={user} />
          </div>
          {/*<button className='contact-button'>Contact</button>*/}
        </div>
      </Fragment>
    );
  }
}

export default StaticProfile;
