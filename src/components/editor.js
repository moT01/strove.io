import React, { useState, useEffect, useCallback, memo } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { navigate } from 'gatsby'

import Layout from 'components/layout'
import FullScreenLoader from 'components/fullScreenLoader.js'
import { selectors } from 'state'
import SEO from 'components/seo'
import { C, actions } from 'state'
import { CONTINUE_PROJECT, RESET_CRON } from 'queries'
import { mutation } from 'utils'
import dayjs from 'dayjs'

const StyledIframe = styled.iframe`
  display: block;
  background: #000;
  border: none;
  min-height: 97vh;
  width: 100vw;
  margin: 0;
  opacity: ${({ loaderVisible }) => (loaderVisible ? 0 : 1)};
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
    const resetCron = () =>
      dispatch(
        mutation({
          name: 'resetCron',
          mutation: RESET_CRON,
          variables: { projectId },
          onLoadingDispatch: () => actions.latency.latencyMeasureStart(dayjs()),
          onSuccessDispatch: () => actions.latency.latencyMeasureEnd(dayjs()),
        })
      )
    projectId && resetCron()
    const projectPing = setInterval(resetCron, 59000)

    const checkIfProjectIsActive = () => {
      /* This condition means that the project has been closed but user is still inside editor */
      if (!currentProject?.additionalPorts?.length) {
        navigate('/app/dashboard')
      }
    }

    const activeProjectCheck = setInterval(checkIfProjectIsActive, 10000)

    return () => {
      clearInterval(projectPing)
      clearInterval(activeProjectCheck)
    }
  }, [projectId])

  const randomId = Math.random()
    .toString(36)
    .substring(7)

  return (
    <Layout>
      <SEO title="Editor" />
      {loaderVisible && (
        <FullScreenLoader
          isFullScreen={true}
          type="openProject"
          color="#0072ce"
        />
      )}
      <StyledIframe
        loaderVisible={loaderVisible}
        onLoad={useCallback(() => setLoaderVisible(false))}
        src={`${process.env.SILISKY_ENDPOINT}/editor?token=${token}&id=${machineId}&port=${port}&r=${randomId}`}
      />
    </Layout>
  )
}

export default memo(Editor)
