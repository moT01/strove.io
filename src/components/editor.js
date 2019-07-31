import React, { useState, useEffect, useCallback, memo } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'

import Layout from 'components/layout'
import Loader from 'components/fullScreenLoader.js'
import { selectors } from 'state'
import SEO from 'components/seo'
import { C } from 'state'
import { CONTINUE_PROJECT, RESET_CRON } from 'queries'
import { mutation } from 'utils'
const StyledIframe = styled.iframe`
  display: block;
  background: #000;
  border: none;
  min-height: 97vh;
  width: 100vw;
  margin: 0;
`

const getUserToken = selectors.api.getApiData('user', null, 'siliskyToken')

const Editor = () => {
  const dispatch = useDispatch()

  const currentProject = useSelector(selectors.api.getCurrentProject)
  const projectId = currentProject && currentProject.id
  const machineId = currentProject && currentProject.machineId
  const port = currentProject && currentProject.editorPort

  const token = useSelector(getUserToken)
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
            ({ id, editorPort, machineId }) => ({
              type: C.UPDATE_ITEM,
              payload: {
                storeKey: 'myProjects',
                id,
                data: { editorPort, machineId },
              },
            }),
          ],
        })
      )
    }
  }, [projectId, machineId])

  useEffect(() => {
    const projectPing = setInterval(() => {
      dispatch(
        mutation({
          name: 'resetCron',
          mutation: RESET_CRON,
          variables: { projectId },
        })
      )
    }, 59000)

    return () => {
      clearInterval(projectPing)
    }
  }, [])

  return (
    <Layout>
      <SEO title="Editor" />
      {loaderVisible && (
        <Loader isFullScreen={true} type="addProject" color="#0072ce" />
      )}
      <StyledIframe
        onLoad={useCallback(() => setLoaderVisible(false))}
        src={`${process.env.SILISKY_ENDPOINT}/editor?token=${token}&id=${machineId}&port=${port}`}
        style={{ opacity: loaderVisible ? 0 : 1 }}
      />
    </Layout>
  )
}

export default memo(Editor)
