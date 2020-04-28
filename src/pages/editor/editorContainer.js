import React, { useState, useEffect, memo, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { Header, FullScreenLoader, SEO } from 'components'
import { selectors } from 'state'
import { CONTINUE_PROJECT, RESET_CRON } from 'queries'
import { mutation, getWindowPathName, getWindowSearchParams } from 'utils'
import Editor from './editor'

const EditorWrapper = ({ history }) => {
  const dispatch = useDispatch()

  const currentProject = useSelector(selectors.api.getCurrentProject)
  const projectId = currentProject?.id
  const machineId = currentProject?.machineId
  const machineName = currentProject?.machineName
  const port = currentProject?.editorPort
  const teamId = currentProject?.teamId
  const isEmbed = getWindowPathName().includes('embed')

  const token = useSelector(selectors.getToken)
  const [loaderVisible, setLoaderVisible] = useState(true)

  useEffect(() => {
    // This condition means project has been stopped
    if (!!projectId && !machineId) {
      dispatch(
        mutation({
          name: 'continueProject',
          mutation: CONTINUE_PROJECT,
          variables: { projectId, teamId: currentProject.teamId },
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
        })
      )
    projectId && resetCron()
    const projectPing = setInterval(resetCron, 59000)

    const checkIfProjectIsActive = () => {
      /* This condition means that the project has been closed but user is still inside editor */
      if (!currentProject?.additionalPorts?.length) {
        const path = getWindowPathName()
        if (path.includes('/embed/editor')) {
          const searchParams = getWindowSearchParams()
          const repoUrl = searchParams.get('repoUrl')
          history.push(`/embed/runProject/?repoUrl=${repoUrl}`)
        } else {
          history.push('/app/dashboard')
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

  const setLoaderVisibleFalse = useCallback(() => setLoaderVisible(false), [])

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
      {token && machineName && machineId && port && (
        <Editor
          token={token}
          machineName={machineName}
          port={port}
          onLoad={setLoaderVisibleFalse}
          isEmbed={isEmbed}
          projectId={projectId}
          teamId={teamId}
        />
      )}
    </>
  )
}

export default memo(withRouter(EditorWrapper))
