import React, { memo } from 'react'
import { Router } from '@reach/router'
import { navigate } from 'gatsby'
import { useSelector } from 'react-redux'

import { selectors } from 'state'
import { window, getSearchParams } from 'utils'
import { PrivateRoute, Editor, FullScreenLogin } from 'components'

const getToken = selectors.api.getUserField('siliskyToken')

/* Todo: Add embed only loading screen */
const Embed = () => {
  const token = useSelector(getToken)

  const searchParams = getSearchParams()
  const projectUrl = searchParams.get('projectUrl')

  if (!token && window?.location?.pathname !== `/embed/`) {
    // If users is not logged in, redirect to the embed main page.
    navigate('/embed/')
  }
  // else if (token && window?.location?.pathname !== `/embed/editor/`) {
  //   navigate('/embed/run/')
  // }

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
