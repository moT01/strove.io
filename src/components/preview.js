import React, { useState } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import getOr from 'lodash/fp/getOr'

import { selectors } from 'state'
import SEO from 'components/seo'
import Loader from 'components/fullScreenLoader.js'

const StyledIframe = styled.iframe`
  display: block;
  background: #000;
  border: none;
  min-height: 100vh;
  width: 100vw;
  margin: 0;
`

const getProjectId = getOr(undefined, ['currentProject', 'id'])
const getMachineId = getOr(undefined, ['currentProject', 'machineId'])
// const getPreviewPort = getOr(undefined, ['currentProject', 'previewPort'])

// getMachineId({ currentProject: { machineId: 123 } })
const getUserToken = selectors.getApiData('user', {}, 'siliskyToken')

const host = window && window.location && window.location.search

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
          color={'#0072ce'}
          style={{
            opacity: loaderVisible ? 1 : 0,
            transition: 'opacity 0.5s',
          }}
        />
      )}
      <StyledIframe
        onLoad={() => setLoaderVisible(false)}
        // src={`${process.env.SILISKY_ENDPOINT}/preview?token=${token}&id=${id}&port=${port}`}
        src={`${process.env.SILISKY_ENDPOINT}/preview?token=${token}&machineId=${machineId}&host=${host}&projectId=${projectId}`}
        style={{ opacity: loaderVisible ? 0 : 1, transition: 'opacity 0.5s' }}
      />
    </>
  )
}

export default Preview
