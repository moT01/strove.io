import React, { memo } from 'react'
import { Router } from '@reach/router'
import { navigate } from 'gatsby'
import { useSelector } from 'react-redux'
import { selectors } from 'state'
import { window } from 'utils'
import { PrivateRoute, Editor, Dashboard, FullScreenLogin } from 'components'

const getToken = selectors.api.getUserField('siliskyToken')

/* Todo: Add embed only loading screen */
const Embed = () => {
  const token = useSelector(getToken)

  if (!token && window?.location?.pathname !== `/embed/`) {
    // If we’re not logged in, redirect to the home page.
    navigate('/embed/')
    return null
  }

  return (
    <Router>
      <FullScreenLogin path="/embed" />
      <PrivateRoute path="/embed/editor" component={Editor} />
    </Router>
  )
}

export default memo(Embed)
