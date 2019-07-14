import React, { useState, useEffect } from 'react'
import { ApolloProvider } from 'react-apollo'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { createStore as reduxCreateStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import storage from 'redux-persist/lib/storage'
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'
import { GITHUB_LOGIN, GITLAB_LOGIN } from 'queries'
import { mutation, window } from 'utils'
import { createProject } from 'utils'
import { selectors } from 'state'

import Modal from 'components/modal'

export default ({ children }) => {
  const [loginWithGithub, setLoginWithGithub] = useState(false)
  const [loginWithGitlab, setLoginWithGitlab] = useState(false)
  const [addGithubToLogin, setAddGithubToLogin] = useState(false)
  const [addGitlabToLogin, setAddGitlabToLogin] = useState(false)

  const dispatch = useDispatch()
  const user = useSelector(selectors.getUser)
  const githubToken = user && user.githubToken
  const gitlabToken = user && user.gitlabToken

  const addProject = repoLink => {
    const repoUrlParts = repoLink.split('/')
    const repoProvider = repoUrlParts[2].split('.')[0]

    const repoFromGithub = repoProvider === 'github'
    const repoFromGitlab = repoProvider === 'gitlab'

    /* ToDo: Handle private github repos */
    if (!user && repoFromGithub) {
      setLoginWithGithub(true)
    } else if (!user && repoFromGitlab) {
      setLoginWithGitlab(true)
    } else if (user && repoFromGithub && !githubToken) {
      setAddGithubToLogin(true)
    } else if (user && repoFromGitlab && !gitlabToken) {
      setAddGitlabToLogin(true)
    } else {
      createProject({ repoLink, dispatch, user })
    }
  }

  return (
    <>
      {children({ addProject })}
      <Modal
        isOpen={loginWithGithub}
        onRequestClose={() => setLoginWithGithub(false)}
        contentLabel="Login first"
        ariaHideApp={false}
      >
        Login with github
      </Modal>
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
// }
