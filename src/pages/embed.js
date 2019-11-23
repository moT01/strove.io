import React, { memo } from 'react'
import { Router } from '@reach/router'
import { navigate } from 'gatsby'
import { useSelector } from 'react-redux'

import { selectors } from 'state'
import { getWindowSearchParams, getWindowPathName } from 'utils'
import { PrivateRoute, Editor, Embed } from 'components'

const getToken = selectors.api.getUserField('siliskyToken')

/* Todo: Add embed only loading screen */
const EmbedWrapper = () => {
  const token = useSelector(getToken)

  const searchParams = getWindowSearchParams()
  const projectUrl = searchParams.get('projectUrl')

  console.log('getWindowPathName', getWindowPathName())

  // if (!token && getWindowPathName() !== `/embed/` && ) {
  //   // If users is not logged in, redirect to the embed main page.
  //   navigate('/embed/')
  // }
  // else if (token && window?.location?.pathname !== `/embed/editor/`) {
  //   navigate('/embed/run/')
  // }

  return (
    <Router>
      <Embed.Login path="/embed" />
      <Embed.Login path="/embed/login" />
      <Embed.Login path="/embed/goBackToOrigin" />
      <Embed.Login path="/embed/run" />
      <PrivateRoute path="/embed/editor" component={Editor} />
    </Router>
  )
}

export default memo(EmbedWrapper)
