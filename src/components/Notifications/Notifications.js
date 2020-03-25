import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../../contexts/appContext';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
// MUI Stuff
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
// Icons
import NotificationsIcon from '@material-ui/icons/Notifications';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatIcon from '@material-ui/icons/Chat';

class Notifications extends Component {
  state = {
    anchorEl: null
  };
  static contextType = AppContext;

  handleOpen = event => {
    this.setState({ anchorEl: event.target });
  };
  handleClose = event => {
    this.setState({ anchorEl: null });
  };
  onMenuOpened = () => {
    if (this.context.notifications) {
      let unreadNotificationsIds = this.context.notifications
        .filter(notification => !notification.read)
        .map(notification => notification.id);
      this.context.markNotificationsRead(unreadNotificationsIds);
    }
  };
  render() {
    const notifications = this.context.notifications;
    const anchorEl = this.state.anchorEl;
    dayjs.extend(relativeTime);

    let notificationsIcon;
    if (notifications && notifications.length > 0) {
      notifications.filter(notification => notification.read === false).length >
      0
        ? (notificationsIcon = (
            <Badge
              badgeContent={
                notifications.filter(
                  notification => notification.read === false
                ).length
              }
              color='secondary'>
              <NotificationsIcon />
            </Badge>
          ))
        : (notificationsIcon = <NotificationsIcon />);
    } else {
      notificationsIcon = <NotificationsIcon />;
    }

    let notificationsMarkup =
      notifications && notifications.length > 0 ? (
        notifications.map(notification => {
          const verb = notification.type === 'like' ? 'liked' : 'commented on';
          const time = dayjs(notification.date_created).fromNow();
          const iconColor = notification.read ? 'primary' : 'secondary';
          const icon =
            notification.type === 'like' ? (
              <FavoriteIcon color={iconColor} style={{ marginRight: 10 }} />
            ) : (
              <ChatIcon color={iconColor} style={{ marginRight: 10 }} />
            );
          return (
            <MenuItem
              key={notification.date_created}
              onClick={this.handleClose}>
              {icon}
              <Typography
                component={Link}
                color='default'
                variant='body1'
                to={`/users/${notification.recipient}/meows/${notification.meow_id}`}>
                {notification.sender} {verb} your meow {time}
              </Typography>
            </MenuItem>
          );
        })
      ) : (
        <MenuItem onClick={this.handleClose}>
          You have no notifications
        </MenuItem>
      );

    return (
      <>
        <IconButton
          aria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup='true'
          onClick={this.handleOpen}>
          {notificationsIcon}
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          onEntered={this.onMenuOpened}>
          {notificationsMarkup}
        </Menu>
      </>
    );
  }
}

export default Notifications;
