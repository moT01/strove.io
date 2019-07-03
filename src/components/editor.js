import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { Location } from '@reach/router'

import Layout from 'components/layout'
import Loader from 'components/fullScreenLoader.js'
import { STOP_PROJECT } from 'queries'
import { selectors } from 'state'
import SEO from 'components/seo'
import getOr from 'lodash/fp/getOr'

const StyledIframe = styled.iframe`
  display: block;
  background: #000;
  border: none;
  min-height: 95vh;
  width: 100vw;
  margin: 0;
`

const getMachineId = getOr(undefined, ['currentProject', 'machineId'])
const getEditorPort = getOr(undefined, ['currentProject', 'editorPort'])
const getPreviewPort = getOr(undefined, ['currentProject', 'previewPort'])
const getUserToken = selectors.getData('user', {}, 'siliskyToken')

const EditorComponent = ({ location }) => {
  const token = useSelector(getUserToken)
  const id = useSelector(getMachineId)
  const port = useSelector(getEditorPort)
  const [loaderVisible, setLoaderVisible] = useState(true)

  useEffect(() => {
    window.addEventListener('beforeunload', ev => {
      ev.preventDefault()
      return (ev.returnValue = 'Are you sure you want to close?')
    })
  }, [])

  return (
    <Layout>
      <SEO title="Editor" />
      {loaderVisible && <Loader isFullScreen={true} color="#0072ce" />}
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
