import React, { Component } from 'react'
import config from '../../config'
import dayjs from 'dayjs'
import withStyles from '@material-ui/core/styles/withStyles'
import { Link } from 'react-router-dom'
import MyButton from '../MyButton/MyButton'
import TextField from '@material-ui/core/TextField'
import './MeowDialog.css'
// mui stuff
import { MdChat, MdClose, MdUnfoldMore } from 'react-icons/md';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button'
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
// context
import AppContext from '../../contexts/appContext';
import LikeButton from '../LikeButton/LikeButton';

const styles = theme =>  ({
  ...theme, 
  separator: {
    border: 'none',
    margin: '4'
  }
})

export default class MeowDialog extends Component {
  constructor(props) {
    super(props)
  }
  state = {
    open: false,
    error: '',
  }

  static contextType = AppContext;

  handleOpen = () => {
    this.setState({ open: true })
    this.context.getMeow(this.props.meow_id)
  }
  handleClose = () => {
    this.setState({ open: false })
    if (this.state.error) {
      this.setState({ error: ''})
    }
  }
  render() {
    return (
      <AppContext.Consumer>
        {(value) => {
          console.log(value.meow.user_image)
          const dialogMarkup = value.loadingloading ? 
          (
          <CircularProgress size={200} /> 
          ) : ( 
          <Grid container spacing={10}>
            <Grid item sm={5}>
              <img src={`http://localhost:8000/${value.meow.user_image}`} alt="profile" className="profileImage" />
            </Grid>
            <Grid item sm={7}>
              <Typography
                component={Link}
                color="primary"
                variant="h5"
                to={`#`}
              >
                  @{value.meow.userhandle}
              </Typography>
              <hr className="separator"></hr>
              <Typography variant="body2" color="textSecondary">
                {dayjs(value.meow.date_created).format('h:mm a, MMMM DD YYYY')}
              </Typography>
              <hr className="separator"/>
              <Typography variant="body1" >
                {value.meow.body}
              </Typography>
              <LikeButton meow_id={value.meow.meow_id} />
              <span>{value.meow.likecount} likes</span>
              <MyButton tip="Comment" tipClassName='tooltipnav'>
                <MdChat color="primary" />
              </MyButton>
              <span>{value.meow.commentcount} comments</span>
            </Grid>
          </Grid>
          )
          return (
            <>
              <MyButton onClick={this.handleOpen} tip="" tipClassName="expandButton">
                <MdUnfoldMore color="primary" />
              </MyButton>
              <Dialog
               open={this.state.open} 
               onClose={this.handleClose} 
               fullWidth 
               maxWidth="sm"
              >
               <MyButton  onClick={this.handleClose} tipClassName="closeButton">
                 <MdClose />
               </MyButton>
               <DialogContent className="dialogContent">
                 {dialogMarkup}
               </DialogContent>
               </Dialog>
            </>
          )
        }}
      </AppContext.Consumer>
    )
  }
}
