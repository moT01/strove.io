import React, { useState, useEffect, useCallback, memo } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { navigate } from 'gatsby'

import { Header, FullScreenLoader, SEO } from 'components'
import { selectors } from 'state'
import { actions } from 'state'
import { CONTINUE_PROJECT, RESET_CRON } from 'queries'
import { mutation, getWindowPathName, getWindowSearchParams } from 'utils'
import dayjs from 'dayjs'

const StyledIframe = styled.iframe`
  display: block;
  background: ${({ theme }) => theme.colors.c3};
  border: none;
  min-height: 97vh;
  width: 100vw;
  margin: 0;
  opacity: ${({ loaderVisible }) => (loaderVisible ? 0 : 1)};
`

const getUserToken = selectors.api.getApiData({
  fields: ['user', 'siliskyToken'],
  defaultValue: null,
})

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
          onSuccessDispatch: null,
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
      console.log('getWindowPathName', getWindowPathName())
      /* This condition means that the project has been closed but user is still inside editor */
      if (!currentProject?.additionalPorts?.length) {
        const path = getWindowPathName()
        if (path.includes('embed')) {
          const searchParams = getWindowSearchParams()
          const repoUrl = searchParams.get('repoUrl')
          navigate(`/embed/runProject/?repoUrl=${repoUrl}`)
        } else {
          navigate('/app/dashboard')
        }
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
    <>
      <SEO title="Editor" />
      <Header />
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
    </>
  )
}

export default memo(Editor)
