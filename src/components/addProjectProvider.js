import React, { useState, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { isMobileOnly } from 'react-device-detect'

import { createProject } from 'utils'
import { selectors } from 'state'
import AddProjectModals from 'components/addProjectModals'
import { actions } from 'state'
import getRepoInfo from 'utils/getRepoInfo'
import Modal from 'components/modal'
import Loader from 'components/fullScreenLoader'

const AddProjectProvider = ({ children }) => {
  const [modalContent, setModalContent] = useState()
  const isLoading = useSelector(selectors.api.getLoading('myProjects'))
  const isDeleting = useSelector(selectors.api.getLoading('deleteProject'))
  const isStopping = useSelector(selectors.api.getLoading('stopProject'))
  const isContinuing = useSelector(selectors.api.getLoading('continueProject'))

  const dispatch = useDispatch()
  const user = useSelector(selectors.api.getUser)
  const projects = useSelector(selectors.api.getUserProjects)
  const githubToken = user?.githubToken
  const gitlabToken = user?.gitlabToken
  const addProjectError = useSelector(selectors.incomingProject.getError)
  const currentProject = projects.find(item => item.machineId)
  const currentProjectId = currentProject && currentProject.id
  const subscription = useSelector(selectors.api.getApiData('subscription'))

  const subscriptionStatus = subscription.status
  const projectsLimit = subscription.projects_limit

  const addProject = async repoLink => {
    const repoUrlParts = repoLink.split('/')
    const repoProvider = repoUrlParts[2].split('.')[0]

    const repoFromGithub = repoProvider === 'github'
    const repoFromGitlab = repoProvider === 'gitlab'

    const repoInfo = await getRepoInfo({ repoLink, dispatch, user })

    dispatch(
      actions.incomingProject.addIncomingProject({ repoLink, repoProvider })
    )
    if (!user && repoFromGithub) {
      setModalContent('LoginWithGithub')
    } else if (!user && repoFromGitlab) {
      setModalContent('LoginWithGitlab')
    } else if (user && repoFromGithub && !githubToken) {
      setModalContent('AddGithubToLogin')
    } else if (user && repoFromGitlab && !gitlabToken) {
      setModalContent('AddGitlabToLogin')
    } else if (
      addProjectError &&
      addProjectError.message &&
      addProjectError.message.includes('Could not resolve to a Repository')
    ) {
      setModalContent('AddGithubPrivatePermissions')
    } else if (addProjectError) {
      setModalContent('SomethingWentWrong')
    } else if (projects && projects.length === projectsLimit) {
      setModalContent('ProjectsLimitExceeded')
    } else if (currentProjectId) {
      setModalContent('AnotherActiveProject')
    } else if (repoInfo?.isPrivate && subscriptionStatus !== 'active') {
      setModalContent('PrivateRepo')
    } else {
      createProject({ repoLink, dispatch, user, setModalContent })
    }
  }

  return (
    <>
      {children({ addProject })}
      <AddProjectModals
        projectsLimit={projectsLimit}
        modalContent={modalContent}
        setModalContent={setModalContent}
      />
      <Modal
        width={isMobileOnly ? '60vw' : '20vw'}
        height={isMobileOnly ? '30vh' : '20vh'}
        isOpen={isLoading || isDeleting || isStopping || isContinuing}
        contentLabel="Loading"
        ariaHideApp={false}
      >
        <Loader isFullScreen={false} color={'#0072ce'} height={'15vh'} />
      </Modal>
    </>
  )
}

export default memo(AddProjectProvider)
