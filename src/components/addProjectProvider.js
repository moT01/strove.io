import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import thunk from 'redux-thunk'

import { GITHUB_LOGIN, GITLAB_LOGIN } from 'queries'
import { mutation } from 'utils'
import { createProject } from 'utils'
import { selectors } from 'state'
import AddProjectModals from 'components/addProjectModals'
import Modal from 'components/modal'
import { actions } from 'state'

const getProjectError = selectors.getError('myProjects')

export default ({ children }) => {
  const [modalContent, setModalContent] = useState()

  const dispatch = useDispatch()
  const user = useSelector(selectors.getUser)
  const githubToken = user && user.githubToken
  const gitlabToken = user && user.gitlabToken
  const addProjectError = useSelector(getProjectError)

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
      addProjectError.message.includes('Could not resolve to a Repository')
    ) {
      setModalContent('AddGithubPrivatePermissions')
    } else if (addProjectError) {
      setModalContent('SomethingWentWrong')
    } else {
      createProject({ repoLink, dispatch, user })
    }
  }

  return (
    <>
      {children({ addProject })}
      {/* <Modal
        isOpen={!!modalContent}
        onRequestClose={setModalContent}
        contentLabel={modalContent}
        ariaHideApp={false}
        width="40vw"
        height="35vh"
      > */}
      <AddProjectModals modalContent={modalContent} />
      {/* </Modal> */}
    </>
  )
}

// Gitclone cases
// const AddProjectMessages = {
//   'githubClone/noUser': <LoginWithGithub />,
//   'gitlabClone/noUser': <LoginWithGitlab />,
//   'githubClone/noGithubToken': <AddGithubToLogin />,
//   'gitlabClone/noGitlabToken': <AddGitlabToLogin />,
//   'githubClone/privateRepo': <AddGithubPrivatePermissions />
//   'error': <SomethingWentWrong />
// }
