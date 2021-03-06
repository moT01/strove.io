import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { selectors } from 'state'

const PrivateRoute = ({
  component: Component,
  location,
  onAccessDenied,
  history,
  ...rest
}) => {
  const token = useSelector(selectors.getToken)

  if (!token && location.pathname !== `/`) {
    // If we’re not logged in, redirect to the home page.
    onAccessDenied && onAccessDenied()
    return <Redirect to="/" />
  }

  return <Component {...rest} />
}

export default memo(PrivateRoute)
