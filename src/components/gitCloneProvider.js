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

const getGithubToken = selectors.getApiData('user', null, 'githubToken')
const getGitlabToken = selectors.getApiData('user', null, 'gitlabToken')

export default ({ children }) => {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false)
  const [isAuthorized, setAuthorized] = useState(false)
  const dispatch = useDispatch()
  const user = useSelector(selectors.getUser)

  const addProject = repoLink => {
    if (repoLink && !user) {
      setLoginModalOpen(true)
    } else if (repoLink && user) {
      createProject({ repoLink, dispatch, user })
    }
  }

  return (
    <>
      {children({ addProject })}
      <Modal
        isOpen={isLoginModalOpen}
        onRequestClose={() => setLoginModalOpen(false)}
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
//   'githubClone/noGithubToken': <AddGithubPermissions />,
//   'gitlabClone/noGitlabToken': <LoginWithGitlab />,
//   'githubClone/privateRepo': <NoPrivatePermissions />
// }
