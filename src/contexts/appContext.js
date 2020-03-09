import React from 'react'

const AppContext = React.createContext({
  updateUserData: () => {},
  userData: {},
  meows: [],
})

export default AppContext;