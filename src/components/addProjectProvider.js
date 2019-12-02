import React, { useState, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import {
  createProject,
  getRepoProvider,
  changeRepoLinkFromSshToHttps,
  mutation,
  redirectToEditor,
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

const AddProjectProvider = ({ children }) => {
  const dispatch = useDispatch()
  const [modalContent, setModalContent] = useState()
  const isLoading = useSelector(selectors.api.getLoading('myProjects'))
  const isDeleting = useSelector(selectors.api.getLoading('deleteProject'))
  const isStopping = useSelector(selectors.api.getLoading('stopProject'))
  const isContinuing = useSelector(selectors.api.getLoading('continueProject'))
  const user = useSelector(selectors.api.getUser)
  const projects = useSelector(selectors.api.getUserProjects)
  const githubToken = user?.githubToken
  const gitlabToken = user?.gitlabToken
  const bitbucketRefreshToken = user?.bitbucketRefreshToken
  const isAdding = useSelector(selectors.incomingProject.isIncoming)
  const addProjectError = useSelector(selectors.incomingProject.getError)
  const currentProject = projects.find(item => item.machineId)
  const currentProjectId = currentProject?.id
  // const subscription = useSelector(
  //   selectors.api.getApiData({ fields: 'subscription' })
  // )
  // const subscriptionStatus = subscription.status
  const projectsLimit = 20
  // (subscriptionStatus === 'active' && subscription.projects_limit) || 4

  const addProject = async ({ link, name }) => {
    let repoLink
    let repoProvider

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

    const existingProject = projects.find(
      project => project.repoLink === `${repoLink}.git`
    )

    dispatch(
      actions.incomingProject.addIncomingProject({
        repoLink,
        repoProvider,
        name,
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
    } else if (user && repoFromGitlab && !gitlabToken) {
      setModalContent('AddGitlabToLogin')
    } else if (user && repoFromBitbucket && !bitbucketRefreshToken) {
      setModalContent('AddBitbucketToLogin')
      // ToDo: Handle gitlab and bitbucket unresolved repo errors
    } else if (
      addProjectError &&
      addProjectError.message &&
      addProjectError.message.includes('Could not resolve to a Repository')
    ) {
      setModalContent('AddEmptyProject')
    } else if (addProjectError) {
      setModalContent('SomethingWentWrong')
    } else if (projects && projects.length >= projectsLimit) {
      setModalContent('ProjectsLimitExceeded')

      dispatch(actions.incomingProject.removeIncomingProject)
    } else if (
      currentProjectId &&
      currentProject.machineId !== existingProject.machineId
    ) {
      setModalContent('AnotherActiveProject')
    } else {
      createProject({ repoLink, dispatch, user, setModalContent, name })
    }
    if (existingProject) {
      if (existingProject.machineId) {
        return redirectToEditor()
      } else {
        return dispatch(
          mutation({
            name: 'continueProject',
            mutation: CONTINUE_PROJECT,
            variables: { projectId: existingProject?.id },
            onSuccessDispatch: null,
          })
        )
      }
    }
  }

  return (
    <>
      {children({ addProject })}
      <AddProjectModals
        projectsLimit={projectsLimit}
        modalContent={modalContent}
        setModalContent={setModalContent}
        addProject={addProject}
      />
      <StyledModal
        isOpen={(isLoading && !isAdding) || isDeleting || isStopping}
        contentLabel="Loading"
        ariaHideApp={false}
      >
        <FullScreenLoader
          isFullScreen={false}
          color="#0072ce"
          height={'15vh'}
        />
      </StyledModal>
      {isContinuing && (
        <FullScreenLoader type="continueProject" isFullScreen color="#0072ce" />
      )}
      {isAdding && isLoading && (
        <FullScreenLoader type="addProject" isFullScreen color="#0072ce" />
      )}
    </>
  )
}

export default memo(AddProjectProvider)
