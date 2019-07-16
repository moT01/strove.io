import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import getOr from 'lodash/fp/getOr'

import { window } from 'utils'
import { selectors } from 'state'
import SEO from 'components/seo'
import Loader from 'components/fullScreenLoader.js'

const StyledIframe = styled.iframe`
  display: block;
  border: none;
  min-height: 100vh;
  width: 100vw;
  margin: 0;
  transition: 'opacity 0.5s'
  opacity: ${({ loaderVisible }) => (loaderVisible ? 0 : 1)};
`

const getProjectId = getOr(undefined, ['currentProject', 'id'])
const getMachineId = getOr(undefined, ['currentProject', 'machineId'])
const getUserToken = selectors.getApiData('user', {}, 'siliskyToken')

const host = window?.location?.search

const Preview = () => {
  const token = useSelector(getUserToken)
  const machineId = useSelector(getMachineId)
  const projectId = useSelector(getProjectId)
  const [loaderVisible, setLoaderVisible] = useState(true)

  return (
    <>
      <SEO title="Preview" />
      {loaderVisible && (
        <Loader
          isFullScreen={true}
          color='#0072ce'
          style={{
            opacity: loaderVisible ? 1 : 0,
            transition: 'opacity 0.5s',
          }}
        />
      )}
      <StyledIframe
        onLoad={useCallback(() => setLoaderVisible(false))}
        src={`${process.env.SILISKY_ENDPOINT}/preview?token=${token}&machineId=${machineId}&host=${host}&projectId=${projectId}`}
        loaderVisible={loaderVisible}
      />
    </>
  )
}

export default Preview
