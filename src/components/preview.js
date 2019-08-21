import React, { useState, useCallback, memo } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

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
  transition: 'opacity 0.5s';
  opacity: ${({ loaderVisible }) => (loaderVisible ? 0 : 1)};
`

const StyledLoader = styled(Loader)`
  opacity: ${({ loaderVisible }) => (loaderVisible ? 1 : 0)};
  transition: 'opacity 0.5s';
`

const getUserToken = selectors.api.getApiData('user', null, 'siliskyToken')

const host = window?.location?.search

const Preview = () => {
  const token = useSelector(getUserToken)
  const currentProject = useSelector(selectors.api.getCurrentProject)
  const machineId = currentProject && currentProject.machineId
  const projectId = currentProject && currentProject.id
  const [loaderVisible, setLoaderVisible] = useState(true)

  let r = Math.random()
    .toString(36)
    .substring(7)
  console.log('random', r)

  return (
    <>
      <SEO title="Preview" />
      {loaderVisible && <StyledLoader isFullScreen={true} color="#0072ce" />}
      <StyledIframe
        onLoad={useCallback(() => setLoaderVisible(false))}
        src={`${process.env.SILISKY_ENDPOINT}/preview?token=${token}&machineId=${machineId}&host=${host}&projectId=${projectId}&${r}`}
        loaderVisible={loaderVisible}
      />
    </>
  )
}

export default memo(Preview)
