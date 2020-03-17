import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'

export default function WithLoading(Component) {
  return (
    function WithLoadingComponent({ isLoading, ...props}) {
      if (!isLoading) return (<Component {...props} />);
      return (  <CircularProgress size={30} className="progressSpinner" /> );
    }
  )
}
