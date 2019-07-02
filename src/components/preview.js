import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

import { projectSelectors, selectors } from 'state'
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

const getUserToken = selectors.getData('user', {}, 'siliskyToken')

const getSelectedProject = projectSelectors.getProjectData

const Preview = () => {
  const token = useSelector(getUserToken)
  const project = useSelector(getSelectedProject)
  const id = project.machineId
  const port = project.previewPort
  const [loaderVisible, setLoaderVisible] = useState(true)

  return (
    <>
      <SEO title="Preview" />

      {loaderVisible && (
        <Loader
          isFullScreen={true}
          style={{
            height: '100vh',
            opacity: loaderVisible ? 1 : 0,
            transition: 'opacity 0.5s',
          }}
        />
      )}
      <StyledIframe
        onLoad={() => setLoaderVisible(false)}
        src={`https://dmb9kya1j9.execute-api.eu-central-1.amazonaws.com/development/preview?token=${token}&id=${id}&port=${port}`}
        style={{ opacity: loaderVisible ? 0 : 1, transition: 'opacity 0.5s' }}
      />
    </>
  )
}

export default Preview
