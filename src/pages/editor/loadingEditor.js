import React, { memo } from 'react'
import { useSelector } from 'react-redux'

import { selectors } from 'state'
import FullScreenLoader from 'components/fullScreenLoader'

const LoadingEditorInfo = () => {
  if (showLoadingMessage)
    return (
      <FullScreenLoader type="loadingEditor" isFullScreen color="#0072ce" />
    )

  return null
}

export default memo(LoadingEditorInfo)
