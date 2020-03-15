import React, { memo } from 'react'
import styled from 'styled-components/macro'
import { Formik } from 'formik'
import { isMobileOnly } from 'react-device-detect'
import { useSelector } from 'react-redux'

import Modal from './modal'
import StroveButton from 'components/stroveButton.js'
import { selectors } from 'state'
import FullScreenLoader from 'components/fullScreenLoader'

const LoadingEditorInfo = () => {
  const queuePosition = useSelector(selectors.api.getQueuePosition)

  if (showLoadingMessage)
    return (
      <FullScreenLoader
        type="addProject"
        isFullScreen
        color="#0072ce"
        queuePosition={queuePosition}
      />
    )

  return null
}

export default memo(LoadingEditorInfo)
