import React from 'react'

const AppContext = React.createContext({
  updateUserData: () => {},
  uploadImage: () => {},
  userData: {},
  meows: [],
})

export default AppContext;