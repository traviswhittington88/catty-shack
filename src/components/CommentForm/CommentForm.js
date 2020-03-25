import React, { Component } from 'react';
// Context
import AppContext from '../../contexts/appContext';
// MUI Stuff
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

class CommentForm extends Component {
  state = {
    body: '',
    error: ''
  };

  static contextType = AppContext;

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.context.postComment(this.props.meow_id, { body: this.state.body });
  };

  render() {
    const { error } = this.state.error;

    const commentFormMarkup = (
      <Grid item sm={12} style={{ textAlign: 'center' }}>
        <form onSubmit={this.handleSubmit}>
          <TextField
            name='body'
            type='text'
            label='Comment on Meow'
            error={error ? true : false}
            value={this.state.body}
            onChange={this.handleChange}
            className='textField'
          />
          <Button
            type='submit'
            variant='contained'
            color='primary'
            className='button'>
            Submit
          </Button>
        </form>
        <hr className='separator' />
      </Grid>
    );
    return commentFormMarkup;
  }
}

export default CommentForm;
