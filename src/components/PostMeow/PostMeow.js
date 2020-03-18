import React, { Component } from 'react';
import MyButton from '../MyButton/MyButton';
import { MdAdd, MdClose } from 'react-icons/md';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import './PostMeow.css';
import AppContext from '../../contexts/appContext';

const styles = theme => ({
  ...theme,
  submitButton: {
    position: 'relative'
  },
  progressSpinner: {
    position: 'absolute'
  },
  closeButton: {
    position: 'absolute',
    left: '90%',
    top: '10%'
  }
});

export default class PostMeow extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    open: false,
    body: '',
    error: ''
  };
  static contextType = AppContext;

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
    if (this.state.error) {
      this.setState({ error: '' });
    }
  };
  handleSubmit = event => {
    event.preventDefault();
    if (this.state.body === '') {
      this.setState({ error: "You can't submit an empty meow, try again!" });
    } else {
      this.context.postMeow({ body: this.state.body });
      this.handleClose();
    }
  };

  render() {
    const { error } = this.state;

    return (
      <>
        <MyButton
          onClick={this.handleOpen}
          tip='Post A Meow!'
          tipClassName='tooltipnav'>
          <MdAdd />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth='sm'>
          <MyButton onClick={this.handleClose} tipClassName='closeButton'>
            <MdClose />
          </MyButton>
          <DialogTitle>Post a new meow</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <TextField
                name='body'
                type='text'
                label='meow'
                rows='3'
                multiline
                placeholder='Scratch out a meow to your furry friend!'
                //error={error.body ? true : false }
                helperText={error.body}
                className='textfield'
                onChange={this.handleChange}
                fullWidth
              />
              <Button
                type='submit'
                variant='contained'
                color='primary'
                className='submitButton'
                //disabled=
              >
                Submit
                {this.context.loading && (
                  <CircularProgress size={30} className='progressSpinner' />
                )}
              </Button>
              {this.state.error && <p className='error'>{this.state.error}</p>}
            </form>
          </DialogContent>
        </Dialog>
      </>
    );
  }
}
