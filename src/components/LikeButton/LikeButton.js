import React, { Component } from 'react';
import MyButton from '../MyButton/MyButton';
import AppContext from '../../contexts/appContext';
// icons
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';

class LikeButton extends Component {
  static contextType = AppContext;

  likedMeow = () => {
    if (
      this.context.user.likes &&
      this.context.user.likes.find(like => like.meow_id === this.props.meow_id)
    )
      return true;
    else return false;
  };

  likeMeow = () => {
    this.context.likeMeow(this.props.meow_id);
  };

  unlikeMeow = () => {
    this.context.unlikeMeow(this.props.meow_id);
  };
  render() {
    let likeButton = this.likedMeow() ? (
      <MyButton
        tip='Undo like'
        tipClassName='tooltipnav'
        onClick={this.unlikeMeow}>
        <MdFavorite />
      </MyButton>
    ) : (
      <MyButton tip='Like' tipClassName='tooltipnav' onClick={this.likeMeow}>
        <MdFavoriteBorder />
      </MyButton>
    );
    return likeButton;
  }
}

export default LikeButton;
