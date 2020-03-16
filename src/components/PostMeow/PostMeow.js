import React, { Component } from 'react'
import MyButton from '../MyButton/MyButton'
import { MdAdd } from 'react-icons/md';
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import CircularProgress from '@material-ui/core/CircularProgress'
import './PostMeow.css'
import AppContext from '../../contexts/appContext';

const styles = {
    
}

export default class PostMeow extends Component {
  constructor(props) {
    super(props)
  }

  state = {
    error: '',
  }

  static contextType = AppContext;

  render() {
    return (
      <>
        <MyButton tip="Post A Meow!" tipClassName='tooltipnav'>
          <MdAdd />
        </MyButton>
      </>
    )
  }
}
