import React, { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { Location } from '@reach/router'
import getOr from 'lodash/fp/getOr'

import Layout from 'components/layout'
import Loader from 'components/fullScreenLoader.js'
import { selectors } from 'state'
import SEO from 'components/seo'
import * as C from 'state/currentProject/constants'
import { CONTINUE_PROJECT } from 'queries'
import { mutation } from 'utils'
const StyledIframe = styled.iframe`
  display: block;
  background: #000;
  border: none;
  min-height: 97vh;
  width: 100vw;
  margin: 0;
`

const getUserToken = selectors.getApiData('user', {}, 'siliskyToken')
const getId = getOr(undefined, ['currentProject', 'id'])
const getMachineId = getOr(undefined, ['currentProject', 'machineId'])
const getPort = getOr(undefined, ['currentProject', 'editorPort'])

const EditorComponent = ({ location }) => {
  const dispatch = useDispatch()
  const token = useSelector(getUserToken)
  const projectId = useSelector(getId)
  const machineId = useSelector(getMachineId)
  const port = useSelector(getPort)
  const [loaderVisible, setLoaderVisible] = useState(true)

  useEffect(() => {
    // This condition means project has been stopped
    if (projectId && !machineId) {
      dispatch(
        mutation({
          name: 'continueProject',
          mutation: CONTINUE_PROJECT,
          variables: { projectId },
          onSuccessDispatch: [
            ({ id, editorPort, previewPort, machineId }) => ({
              type: C.SELECT_CURRENT_PROJECT,
              payload: { id, editorPort, previewPort, machineId },
            }),
          ],
        })
      )
    }
  }, [projectId, machineId])

  useEffect(() => {
    window.addEventListener('beforeunload', ev => {
      ev.preventDefault()
      dispatch({
        type: C.STOP_CURRENT_PROJECT,
      })

      if (navigator && navigator.sendBeacon) {
        navigator.sendBeacon(
          `${process.env.SILISKY_ENDPOINT}/beacon`,
          JSON.stringify({ token, projectId, machineId, type: 'stopProject' })
        )
      }
    })
  }, [])

  useEffect(() => {
    const projectPing = setInterval(() => {
      dispatch(
        mutation({
          name: 'continueProject',
          mutation: CONTINUE_PROJECT,
          variables: { projectId },
        })
      )
    }, 10000)

    return () => clearInterval(projectPing)
  }, [])

  return (
    <Layout>
      <SEO title="Editor" />
      {loaderVisible && <Loader isFullScreen={true} color="#0072ce" />}
      <StyledIframe
        onLoad={useCallback(() => setLoaderVisible(false))}
        src={`${process.env.SILISKY_ENDPOINT}/editor?token=${token}&id=${machineId}&port=${port}`}
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
