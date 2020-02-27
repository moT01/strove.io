import React, { memo } from 'react'

import { getWindowSearchParams } from 'utils'
import { FullScreenLoader } from 'components'
import { useInterval } from 'hooks'

const GoBackTo = () => {
  const searchParams = getWindowSearchParams()
  const goBackTo = searchParams.get('goBackTo')

  /*
    Redirect logged in users
    Redirect should only happen once logged in state is saved to localStorage.
  */
  useInterval(() => {
    if (localStorage.getItem('token') && goBackTo) {
      window.location.replace(goBackTo)
    }
  }, 100)

  return <FullScreenLoader type="redirecting" isFullScreen color="#0072ce" />
}

export default memo(GoBackTo)
