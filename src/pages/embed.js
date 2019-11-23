import React, { memo } from 'react'
import { navigate } from 'gatsby'
import { useSelector } from 'react-redux'

import { selectors } from 'state'
import { getWindowSearchParams, getWindowPathName } from 'utils'

const getToken = selectors.api.getUserField('siliskyToken')

/* Todo: Add embed only loading screen */
const EmbedWrapper = () => {
  const token = useSelector(getToken)

  // const searchParams = getWindowSearchParams()
  // const projectUrl = searchParams.get('projectUrl')

  // if (!token && getWindowPathName() !== `/embed/`) {
  //   // If users is not logged in, redirect to the embed main page.
  //   navigate('/embed/')
  // }

  return <div>Strove Embedded main page</div>
}

export default memo(EmbedWrapper)
