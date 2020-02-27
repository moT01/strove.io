import React, { memo } from 'react'
import { useSelector } from 'react-redux'

import { getWindowSearchParams } from 'utils'
import { selectors } from 'state'
import { FullScreenLoader } from 'components'
import { useInterval } from 'hooks'

const GoBackTo = () => {
  const token = useSelector(selectors.getToken)
  const searchParams = getWindowSearchParams()
  const goBackTo = searchParams.get('goBackTo')

  console.log('goBackTo', goBackTo)
  /*
    Redirect logged in users
    Redirect should only happen once logged in state is saved to localStorage.
    ToDo: Find a better way to do this. One of the ways includes reacting to storage events:
    https://developer.mozilla.org/en-US/docs/Web/API/StorageEvent
  */

  useInterval(
    () => console.log('yeye'), //goBackTo && window.location.replace(goBackTo),
    localStorage.getItem('token') ? 3000 : null
  )

  return <FullScreenLoader type="redirecting" isFullScreen color="#0072ce" />
}

export default memo(GoBackTo)
