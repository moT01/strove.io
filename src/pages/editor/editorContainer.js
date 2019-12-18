import React, { useState, useEffect, memo } from 'react'
import styled from 'styled-components/macro'
import { useSelector, useDispatch } from 'react-redux'
import dayjs from 'dayjs'
import { Redirect } from 'react-router-dom'

import { Header, FullScreenLoader, SEO } from 'components'
import { selectors } from 'state'
import { actions } from 'state'
import { CONTINUE_PROJECT, RESET_CRON } from 'queries'
import { mutation, getWindowPathName, getWindowSearchParams } from 'utils'
import Editor from './editor'

const getUserToken = selectors.api.getApiData({
  fields: ['user', 'siliskyToken'],
  defaultValue: null,
})

const EditorWrapper = () => {
  const dispatch = useDispatch()

  const currentProject = useSelector(selectors.api.getCurrentProject)
  const projectId = currentProject && currentProject.id
  const machineId = currentProject && currentProject.machineId
  const port = currentProject && currentProject.editorPort
  const isEmbed = getWindowPathName().includes('embed')

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        const path = getWindowPathName()
        if (path.includes('embed')) {
          const searchParams = getWindowSearchParams()
          const repoUrl = searchParams.get('repoUrl')
          return <Redirect to={`/embed/runProject/?repoUrl=${repoUrl}`} />
        } else {
          return <Redirect to="/app/dashboard" />
        }
      }
    }

    const activeProjectCheck = setInterval(checkIfProjectIsActive, 10000)

    return () => {
      clearInterval(projectPing)
      clearInterval(activeProjectCheck)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId])

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
      {console.log('rendered')}
      {token && machineId && port && (
        <Editor
          token={token}
          machineId={machineId}
          port={port}
          onLoad={() => setLoaderVisible(false)}
          isEmbed={isEmbed}
          loaderVisible={loaderVisible}
        />
      )}
    </>
  )
}

export default memo(EditorWrapper)
