import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import Layout from 'components/layout'
import { Location } from '@reach/router'
import Loader from 'components/loader.js'

import { selectors } from 'state'
import SEO from 'components/seo'

const StyledIframe = styled.iframe`
  display: block;
  background: #000;
  border: none;
  min-height: 93vh;
  width: 100vw;
  margin: 0;
`

const getUserToken = selectors.getData('user', {}, 'siliskyToken')

const EditorComponent = ({ location }) => {
  const token = useSelector(getUserToken)
  const id = location.state.machineId
  const port = location.state.editorPort
  const [loaderVisible, setLoaderVisible] = useState(true)

  return (
    <Layout>
      <SEO title="Editor" />
      {loaderVisible && <Loader />}
      <StyledIframe
        onLoad={() => setLoaderVisible(false)}
        src={`https://dmb9kya1j9.execute-api.eu-central-1.amazonaws.com/development/editor?token=${token}&id=${id}&port=${port}`}
        style={{ opacity: loaderVisible ? 0 : 1 }}
      />
    </Layout>
  )
}

const Editor = ({ children, ...props }) => (
  <Location>
    {({ location }) => (
      <EditorComponent
        {...props}
        location={location}
        children={children}
      ></EditorComponent>
    )}
  </Location>
)

export default Editor
