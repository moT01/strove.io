import React, { useEffect } from 'react'
import { ApolloProvider } from 'react-apollo'
import { Provider, useDispatch } from 'react-redux'
import { createStore as reduxCreateStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import storage from 'redux-persist/lib/storage'
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'

import { GITHUB_LOGIN, GITLAB_LOGIN } from 'queries'
import { mutation } from 'utils'
import { window } from 'utils'
import AddProjectProvider from 'components/addProjectProvider'
import client from './client'
import rootReducer from './src/state'

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: hardSet,
  whitelist: ['api'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const createStore = reduxCreateStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunk))
)

const persistor = persistStore(createStore)

const LoginProvider = ({ children }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    const code = window?.location?.href
      .match(/code=(.*)(?=&state)/g)
      ?.toString()
      .split('=')[1]

    const state = window?.location?.href
      ?.match(/state=(.*)/g)
      ?.toString()
      .split('=')[1]

    if (code && !localStorage.getItem('token')) {
      switch (state) {
        case 'github':
          dispatch(
            mutation({
              mutation: GITHUB_LOGIN,
              variables: { code },
              storeKey: 'user',
              name: 'githubAuth',
              onSuccess: ({ siliskyToken }) =>
                localStorage.setItem('token', siliskyToken),
            })
          )
          break
        case 'gitlab':
          dispatch(
            mutation({
              mutation: GITLAB_LOGIN,
              variables: { code },
              storeKey: 'user',
              name: 'gitlabAuth',
              onSuccess: ({ siliskyToken }) =>
                localStorage.setItem('token', siliskyToken),
            })
          )
          break
        case 'bitbucket':
          break
        default:
          break
      }
    }
  }, [])

  return children
}

const WithAddProject = ({ children, addProject }) => {
  useEffect(() => {
    const repoLink =
      window?.location?.href?.match(/#(.*)/) &&
      window.location.href.match(/#(.*)/)[1]

    repoLink &&
      /.*(github|gitlab|bitbucket).com/i.test(repoLink) &&
      addProject(repoLink)
  }, [])

  return children
}

export const wrapRootElement = ({ element }) => (
  <ApolloProvider client={client}>
    <Provider store={createStore}>
      <PersistGate loading={null} persistor={persistor}>
        <LoginProvider>
          <AddProjectProvider>
            {({ addProject }) => (
              <WithAddProject addProject={addProject}>{element}</WithAddProject>
            )}
          </AddProjectProvider>
        </LoginProvider>
      </PersistGate>
    </Provider>
  </ApolloProvider>
)
