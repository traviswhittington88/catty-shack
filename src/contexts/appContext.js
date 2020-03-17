import React from 'react'

const AppContext = React.createContext({
  loading: Boolean,
  getMeows: () => {},
  deleteMeow: () => {},
  postMeow: () => {},
  getUser: () => {},
  getLikes: () => {},
  likeMeow: () => {},
  unlikeMeow: () => {},
  getUserData: () => {},
  toggleDialog: () => {},
  editUserDetails: () => {},
  uploadImage: () => {},
  userData: {},
  meows: [],
})

export default AppContext;