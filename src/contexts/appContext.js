import React from 'react';

const AppContext = React.createContext({
  loading: Boolean,
  getMeows: () => {},
  getMeow: () => {},
  deleteMeow: () => {},
  postMeow: () => {},
  postComment: () => {},
  getUser: () => {},
  getUserData: () => {},
  getLikes: () => {},
  likeMeow: () => {},
  unlikeMeow: () => {},
  getUserData: () => {},
  toggleDialog: () => {},
  editUserDetails: () => {},
  uploadImage: () => {},
  userData: {},
  meows: [],
  meow: []
});

export default AppContext;
