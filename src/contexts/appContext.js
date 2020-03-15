import React from 'react'

const AppContext = React.createContext({
  getMeows: () => {},
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