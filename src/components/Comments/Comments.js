import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import config from '../../config';
import './Comments.css';

export default class Comments extends Component {
  render() {
    const { comments } = this.props;
    return (
      <Grid>
        {comments &&
          comments.map(comment => {
            const { body, date_created, user_image, user_name } = comment;
            return (
              <div key={date_created} className='commentContainer'>
                <Grid item sm={12}>
                  <Grid container>
                    <Grid item sm={2}>
                      <img
                        src={require(`${config.API_ENDPOINT}${user_image}`)}
                        alt='comment'
                        className='commentImage'
                      />
                    </Grid>
                    <Grid item sm={9}>
                      <div className='commentData'>
                        <Typography
                          variant='h5'
                          component={Link}
                          to={`/users/${user_name}`}
                          color='primary'>
                          {user_name}
                        </Typography>
                        <Typography variant='body2' color='secondary'>
                          {dayjs(date_created).format('h:mm a, MMM DD YYYY')}
                        </Typography>
                        <hr className='invSeparator' />
                        <Typography variant='body1'>{body}</Typography>
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
                <hr className='separator' />
              </div>
            );
          })}
      </Grid>
    );
  }
}
