import React from 'react'
import { actions } from 'state'
import { Redirect } from 'react-router-dom'

import { getWindowPathName, getWindowSearchParams } from './windowUtils'

/* NO_GATSBY_TODO Pass history */
export default (dispatch, history) => {
  dispatch(actions.incomingProject.removeIncomingProject())
  const path = getWindowPathName()
  if (path.includes('embed')) {
    const searchParams = getWindowSearchParams()
    const repoUrl = searchParams.get('repoUrl')
    history.push(`/embed/editor/?repoUrl=${repoUrl}`)
  } else {
    history.push('/app/editor/')
  }
}
