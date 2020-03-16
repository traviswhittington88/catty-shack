import React, { Component } from 'react'
import AppContext from '../../contexts/appContext'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import { AiOutlineDelete } from 'react-icons/ai';
import MyButton from '../MyButton/MyButton';

const styles = {
  deleteButton: {
    position: 'absolute',
    left: '80%'
  }
}

export default class DeleteMeow extends Component {
  constructor(props) {
    super(props)
  }

  state = {
    open: false,
  }

  static contextType = AppContext;
  
  handleOpen = () => {
    this.setState({ open: true })
  }
  handleClose = () => {
    this.setState({ open: false })
  }
  deleteMeow = () => {
    this.context.deleteMeow(this.props.meow_id)
    this.setState({ open: false })
  }
  render() {
  return (
    <>
      <MyButton  
        onClick={this.handleOpen}
        className="deleteButton"
        tip="Delete Meow!" 
        tipClassName='tooltip'
      >
        <AiOutlineDelete />
      </MyButton>
      <Dialog
        open={this.state.open}
        onClose={this.handleClose}
        fullWidth
        maxWidth="sm"
        >
          <DialogTitle>
            Are you sure you want to delete this right meow?
          </DialogTitle>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.deleteMeow} color="secondary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
    </>
  )
}
}
