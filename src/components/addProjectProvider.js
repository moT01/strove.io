import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { createProject } from 'utils'
import { selectors } from 'state'
import AddProjectModals from 'components/addProjectModals'
import { actions } from 'state'

export default ({ children }) => {
  const [modalContent, setModalContent] = useState()

  const dispatch = useDispatch()
  const user = useSelector(selectors.api.getUser)
  const projects = useSelector(selectors.api.getUserProjects)
  const githubToken = user && user.githubToken
  const gitlabToken = user && user.gitlabToken
  const addProjectError = useSelector(selectors.incomingProject.getError)
  const projectsLimit = user.subscriptionId ? 12 : 4

  const addProject = repoLink => {
    const repoUrlParts = repoLink.split('/')
    const repoProvider = repoUrlParts[2].split('.')[0]

    const repoFromGithub = repoProvider === 'github'
    const repoFromGitlab = repoProvider === 'gitlab'

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
    } else {
      createProject({ repoLink, dispatch, user })
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
    </>
  )
}
