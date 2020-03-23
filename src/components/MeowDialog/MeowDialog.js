import React, { Component } from 'react';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import MyButton from '../MyButton/MyButton';
import Comments from '../Comments/Comments';
import CommentForm from '../CommentForm/CommentForm';
import config from '../../config';
import './MeowDialog.css';
// mui stuff
import { MdChat, MdClose, MdUnfoldMore } from 'react-icons/md';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
// context
import AppContext from '../../contexts/appContext';
import LikeButton from '../LikeButton/LikeButton';

const styles = theme => ({
  ...theme,
  separator: {
    border: 'none',
    margin: '4'
  }
});

export default class MeowDialog extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    open: false,
    error: '',
    oldPath: '',
    newPath: ''
  };

  componentDidMount() {
    if (this.props.openDialog) {
      this.handleOpen();
    }
  }

  static contextType = AppContext;

  handleOpen = () => {
    let oldPath = window.location.pathname;
    const { userHandle, meow_id } = this.props;
    const newPath = `/users/${userHandle}/meows/${meow_id}`;

    if (oldPath.toString() === newPath.toString())
      oldPath = `/users/${userHandle}`;
    window.history.pushState(null, null, newPath);

    this.setState({ open: true, oldPath, newPath });

    this.context.getMeow(this.props.meow_id);
  };
  handleClose = () => {
    window.history.pushState(null, null, this.state.oldPath);
    this.setState({ open: false });
    if (this.state.error) {
      this.setState({ error: '' });
    }
  };
  render() {
    return (
      <AppContext.Consumer>
        {value => {
          const dialogMarkup = value.loading ? (
            <CircularProgress size={200} />
          ) : (
            <Grid container spacing={10}>
              <Grid item sm={5}>
                <img
                  src={`${config.API_ENDPOINT}${value.meow.user_image}`}
                  alt='profile'
                  className='profileImage'
                />
              </Grid>
              <Grid item sm={7}>
                <Typography
                  component={Link}
                  color='primary'
                  variant='h5'
                  to={`#`}>
                  @{value.meow.userhandle}
                </Typography>
                <hr className='separator'></hr>
                <Typography variant='body2' color='textSecondary'>
                  {dayjs(value.meow.date_created).format(
                    'h:mm a, MMMM DD YYYY'
                  )}
                </Typography>
                <hr className='invSeparator' />
                <Typography variant='body1'>{value.meow.body}</Typography>
                <LikeButton meow_id={value.meow.meow_id} />
                <span>{value.meow.likecount} likes</span>
                <MyButton tip='Comment' tipClassName='tooltipnav'>
                  <MdChat color='primary' />
                </MyButton>
                <span>{value.meow.commentcount} comments</span>
              </Grid>
              <hr className='separator' />
              <CommentForm meow_id={value.meow.meow_id} />
              <Comments comments={value.meow.comments} />
            </Grid>
          );
          return (
            <>
              <MyButton
                onClick={this.handleOpen}
                tip=''
                tipClassName='expandButton'>
                <MdUnfoldMore color='primary' />
              </MyButton>
              <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                fullWidth
                maxWidth='sm'>
                <MyButton onClick={this.handleClose} tipClassName='closeButton'>
                  <MdClose />
                </MyButton>
                <DialogContent className='dialogContent'>
                  {dialogMarkup}
                </DialogContent>
              </Dialog>
            </>
          );
        }}
      </AppContext.Consumer>
    );
  }
}
