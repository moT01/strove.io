import React, { memo, useState } from 'react'

import { useInterval } from 'hooks'
import FullScreenLoader from 'components/fullScreenLoader'

const LoadingEditorInfo = () => {
  const [showLoadingMessage, setShowLoadingMessage] = useState(true)
  useInterval(
    () => setShowLoadingMessage(false),
    showLoadingMessage ? 3000 : null
  )

  if (showLoadingMessage)
    return (
      <FullScreenLoader type="loadingEditor" isFullScreen color="#0072ce" />
    )

  return null
}

export default memo(LoadingEditorInfo)
