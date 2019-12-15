import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import { selectors } from 'state'

const getToken = selectors.api.getUserField('siliskyToken')

const PrivateRoute = ({
  component: Component,
  location,
  onAccessDenied,
  history,
  ...rest
}) => {
  const token = useSelector(getToken)

  if (!token && location.pathname !== `/`) {
    // If we’re not logged in, redirect to the home page.
    onAccessDenied && onAccessDenied()
    history.push(`/`)
    return null
  }

  return <Component {...rest} />
}

export default memo(PrivateRoute)
