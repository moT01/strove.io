import React, { memo } from 'react'
import { Router } from '@reach/router'
import { navigate } from 'gatsby'
import { useSelector } from 'react-redux'

import { selectors } from 'state'
import { window } from 'utils'
import { PrivateRoute, Editor, FullScreenLogin } from 'components'

const getToken = selectors.api.getUserField('siliskyToken')

/* Todo: Add embed only loading screen */
const Embed = () => {
  const token = useSelector(getToken)

  if (!token && window?.location?.pathname !== `/embed/`) {
    // If we’re not logged in, redirect to the home page.
    navigate('/embed/')
    return null
  } else if (token && window?.location?.pathname !== `/embed/editor/`) {
    navigate('/embed/run/')
  }

  return (
    <Router>
      <FullScreenLogin path="/embed" />
      <FullScreenLogin path="/embed/login" />
      <FullScreenLogin path="/embed/goBackToOrigin" />
      <FullScreenLogin path="/embed/run" />
      <PrivateRoute path="/embed/editor" component={Editor} />
    </Router>
  )
}

export default memo(Embed)
