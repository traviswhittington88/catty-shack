import React from 'react'

const AppContext = React.createContext({
  getUserData: () => {},
  editUserDetails: () => {},
  uploadImage: () => {},
  userData: {},
  meows: [],
})

export default AppContext;