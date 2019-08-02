import React, { useState, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ApolloClient from 'apollo-boost'

import { createProject } from 'utils'
import { selectors } from 'state'
import AddProjectModals from 'components/addProjectModals'
import { actions } from 'state'
import getRepoInfo from 'utils/getRepoInfo'

const AddProjectProvider = ({ children }) => {
  const [modalContent, setModalContent] = useState()

  const dispatch = useDispatch()
  const user = useSelector(selectors.api.getUser)
  const projects = useSelector(selectors.api.getUserProjects)
  const githubToken = user?.githubToken
  const gitlabToken = user?.gitlabToken
  const addProjectError = useSelector(selectors.incomingProject.getError)
  const currentProjectId = useSelector(selectors.api.getApiData('user'))
    .currentProjectId
  const subscription = useSelector(selectors.api.getApiData('subscription'))

  const subscriptionStatus = subscription.status
  const projectsLimit = subscription.projects_limit

  const addProject = async repoLink => {
    const repoUrlParts = repoLink.split('/')
    const repoProvider = repoUrlParts[2].split('.')[0]

    const repoFromGithub = repoProvider === 'github'
    const repoFromGitlab = repoProvider === 'gitlab'

    const repoInfo = await getRepoInfo({repoLink, dispatch, user})

    console.log('Yeeeeeeet repoInfo', repoInfo)
    console.log('Yeeeeeeet repoPrivate', repoInfo.isPrivate)    

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

export default memo(AddProjectProvider)
