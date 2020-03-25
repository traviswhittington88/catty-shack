import React from 'react';

const AppContext = React.createContext({
  loading: Boolean,
  getMeows: () => {},
  getMeow: () => {},
  deleteMeow: () => {},
  postMeow: () => {},
  postComment: () => {},
  markNotificationsRead: () => {},
  getUser: () => {},
  getUserData: () => {},
  getLikes: () => {},
  likeMeow: () => {},
  unlikeMeow: () => {},
  toggleDialog: () => {},
  editUserDetails: () => {},
  uploadImage: () => {},
  userData: {},
  meows: [],
  meow: [],
  notifications: []
});

export default AppContext;
