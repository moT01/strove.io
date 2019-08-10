import React, { memo } from 'react'
import { navigate } from 'gatsby'
import { useSelector } from 'react-redux'
import { createSelector } from 'reselect'
import { selectors } from 'state'

const getUserToken = selectors.api.getApiData('user', null, 'siliskyToken')

const getToken = createSelector(
  [getUserToken],
  token => token
)

const PrivateRoute = ({
  component: Component,
  location,
  onAccessDenied,
  ...rest
}) => {
  const token = useSelector(getToken)

  if (!token && location.pathname !== `/`) {
    // If we’re not logged in, redirect to the home page.
    onAccessDenied && onAccessDenied()
    navigate(`/`)
    return null
  }

  return <Component {...rest} />
}

export default memo(PrivateRoute)
