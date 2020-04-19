import React, { useState, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components/macro'
import { withRouter } from 'react-router-dom'

import {
  createProject,
  getRepoProvider,
  changeRepoLinkFromSshToHttps,
  mutation,
  handleStopProject,
} from 'utils'
import { CONTINUE_PROJECT } from 'queries'
import { actions, selectors } from 'state'
import Modal from './modal'
import FullScreenLoader from './fullScreenLoader'
import AddProjectModals from './addProjectModals'

const StyledModal = styled(Modal)`
  background: none;
  border: none;
  box-shadow: none;
`

const AddProjectProvider = ({ children, history, teamId, organization }) => {
  const dispatch = useDispatch()
  const [modalContent, setModalContent] = useState()
  const isLoading = useSelector(selectors.api.getLoading('myProjects'))
  const isDeleting = useSelector(selectors.api.getLoading('deleteProject'))
  const isStopping = useSelector(selectors.api.getLoading('stopProject'))
  const isContinuing = useSelector(
    selectors.incomingProject.isProjectBeingStarted
  )
  const isAdding = useSelector(selectors.incomingProject.isProjectBeingAdded)
  const isJoiningLiveshare = useSelector(
    selectors.incomingProject.getIsLiveshare
  )

  const isStartingCollaborationProject = useSelector(
    selectors.api.getLoading('startLiveShare')
  )
  const user = useSelector(selectors.api.getUser)
  const projects = useSelector(selectors.api.getMyProjects)
  const githubToken = user?.githubToken
  const gitlabToken = user?.gitlabToken
  const bitbucketRefreshToken = user?.bitbucketRefreshToken
  const incomingProjectRepoUrl = useSelector(
    selectors.incomingProject.getRepoLink
  )
  const editedTeam = useSelector(selectors.editedOrganization.getEditedTeam)
  const incomingProjectError = useSelector(selectors.incomingProject.getError)
  const currentProject = useSelector(selectors.api.getCurrentProject)
  const continueProjectError = useSelector(
    selectors.api.getError('continueProject')
  )
  const currentProjectId = currentProject?.id
  const queuePosition = useSelector(selectors.api.getQueuePosition)
  /* ToDO: Decide what to do about the projects limit */
  const projectsLimit = 2000000
  // ToDO: Bring this back to reasonable value once we have a good time spent indicator
  const timeExceeded = user?.timeSpent >= 7200000000
  const ownedOrganizations = useSelector(selectors.api.getOwnedOrganizations)

  /* Check if new project is embedded */
  const originDomain =
    window.location !== window.parent.location
      ? document.referrer
      : document.location.href

  if (continueProjectError === 'USER_SESSION_TIME_DEPLETED') {
    dispatch(
      actions.api.updateItem({ storeKey: 'continueProject', error: null })
    )
    dispatch(actions.incomingProject.removeIncomingProject())
    if (!modalContent) {
      setModalContent('TimeExceeded')
    }
  }

  const addProject = ({ link, name, teamId, forkedFromId }) => {
    let repoLink
    let repoProvider

    /* ToDo: Make this scallable and work with other sites as well */
    const type = originDomain.includes('freecodecamp.org') ? 'fcc' : undefined

    /* TODO: Find a reasonable way to approach this */
    const organizationWithProject = organization || ownedOrganizations?.[0]
    const teamIdWithProject = type
      ? ownedOrganizations?.[0]?.teams?.[
          ownedOrganizations?.[0]?.teams?.length - 1
        ]?.id
      : teamId

    let repoFromGithub
    let repoFromGitlab
    let repoFromBitbucket

    if (link) {
      repoLink = link.trim().toLowerCase()

      repoLink = changeRepoLinkFromSshToHttps(repoLink)

      repoProvider = getRepoProvider(repoLink)

      repoFromGithub = repoProvider === 'github'
      repoFromGitlab = repoProvider === 'gitlab'
      repoFromBitbucket = repoProvider === 'bitbucket'
    } else {
      repoLink = ''
    }

    const allExistingProjects = projects.filter(
      project => project.repoLink === `${repoLink}.git`
    )
    const existingProject = allExistingProjects.find(
      project => project.teamId === editedTeam?.id
    )

    const theSameIncomingProject = repoLink === incomingProjectRepoUrl

    if (existingProject) {
      if (!currentProject) {
        dispatch(actions.incomingProject.setProjectIsBeingStarted())
        return dispatch(
          mutation({
            name: 'continueProject',
            mutation: CONTINUE_PROJECT,
            variables: {
              projectId: existingProject?.id,
              teamId: existingProject?.teamId,
            },
          })
        )
      } else if (existingProject?.repoLink === currentProject?.repoLink) {
        return history.push('/app/editor/')
      }
    }

    dispatch(
      actions.incomingProject.addIncomingProject({
        repoLink,
        repoProvider,
        name,
        teamId: teamIdWithProject,
        forkedFromId,
      })
    )

    if (!user && repoFromGithub) {
      setModalContent('LoginWithGithub')
    } else if (!user && repoFromGitlab) {
      setModalContent('LoginWithGitlab')
    } else if (!user && repoFromBitbucket) {
      setModalContent('LoginWithBitbucket')
    } else if (user && repoFromGithub && !githubToken) {
      setModalContent('AddGithubToLogin')
    } else if (
      user &&
      timeExceeded &&
      !incomingProjectRepoUrl &&
      !(
        organizationWithProject.subscriptionStatus === 'active' ||
        organizationWithProject.subscriptionStatus === 'canceled'
      )
    ) {
      setModalContent('TimeExceeded')
      dispatch(actions.incomingProject.removeIncomingProject())
    } else if (user && repoFromGitlab && !gitlabToken) {
      setModalContent('AddGitlabToLogin')
    } else if (user && repoFromBitbucket && !bitbucketRefreshToken) {
      setModalContent('AddBitbucketToLogin')
      // ToDo: Handle gitlab and bitbucket unresolved repo errors
    } else if (
      incomingProjectError &&
      incomingProjectError.message &&
      incomingProjectError.message.includes('Could not resolve to a Repository')
    ) {
      setModalContent('AddEmptyProject')
    } else if (incomingProjectError) {
      setModalContent('SomethingWentWrong')
    } else if (projects && projects.length >= projectsLimit) {
      setModalContent('ProjectsLimitExceeded')
      dispatch(actions.incomingProject.removeIncomingProject())
    } else if (
      currentProjectId &&
      currentProject?.machineId !== existingProject?.machineId
    ) {
      handleStopProject({
        onSuccess: () =>
          createProject({
            repoLink,
            dispatch,
            user,
            setModalContent,
            name,
            teamId: teamIdWithProject,
            forkedFromId,
            type,
          }),
      })
      dispatch(actions.incomingProject.setProjectIsBeingStarted())
    } else if (!theSameIncomingProject && teamId) {
      createProject({
        repoLink,
        dispatch,
        user,
        setModalContent,
        name,
        teamId: teamIdWithProject,
        forkedFromId,
        type,
      })
    }
  }

  return (
    <>
      {children({ addProject, teamId })}
      <AddProjectModals
        projectsLimit={projectsLimit}
        modalContent={modalContent}
        setModalContent={setModalContent}
        addProject={addProject}
        currentProjectId={currentProjectId}
      />
      <StyledModal
        isOpen={
          ((isLoading && !isAdding) || isDeleting) &&
          !window.location.href.includes('editor')
        }
        contentLabel="Loading"
        ariaHideApp={false}
      >
        <FullScreenLoader isFullScreen={false} color="#0072ce" height="15vh" />
      </StyledModal>
      {isContinuing && (
        <FullScreenLoader
          type="continueProject"
          isFullScreen
          color="#0072ce"
          queuePosition={queuePosition}
        />
      )}
      {isAdding && (
        <FullScreenLoader
          type={
            isJoiningLiveshare ? 'addingCollaborationProject' : 'addProject'
          }
          isFullScreen
          color="#0072ce"
          queuePosition={queuePosition}
        />
      )}
      {isStartingCollaborationProject && (
        <FullScreenLoader
          type="addingCollaborationProject"
          isFullScreen
          color="#0072ce"
          queuePosition={queuePosition}
        />
      )}
      {isStopping && (
        <FullScreenLoader
          type="stoppingProject"
          isFullScreen
          color="#0072ce"
          queuePosition={queuePosition}
        />
      )}
    </>
  )
}

export default memo(withRouter(AddProjectProvider))
