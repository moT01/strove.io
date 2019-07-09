import React, { useEffect } from 'react'
import { ApolloProvider } from 'react-apollo'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { createStore as reduxCreateStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import storage from 'redux-persist/lib/storage'
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'
import { GITHUB_LOGIN } from 'queries'
import { mutation, window } from 'utils'
import { createProject } from 'utils'
import { selectors } from 'state'

import client from './client'
import rootReducer from './src/state'

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: hardSet,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const createStore = reduxCreateStore(
  persistedReducer,
  composeWithDevTools(
    applyMiddleware(thunk)
    // other store enhancers if any
  )
)

const persistor = persistStore(createStore)

export const wrapRootElement = ({ element }) => (
  <ApolloProvider client={client}>
    <Provider store={createStore}>
      <PersistGate loading={null} persistor={persistor}>
        <LoginProvider>
          <GitCloneProvider>{element}</GitCloneProvider>
        </LoginProvider>
      </PersistGate>
    </Provider>
  </ApolloProvider>
)

const LoginProvider = ({ children }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    let code =
      window &&
      window.location &&
      window.location.href.match(/code=(.*)(?=&state)/g)

    code && (code = code.toString().split('=')[1])

    let state =
      window && window.location && window.location.href.match(/state=(.*)/g)

    state && (state = state.toString().split('=')[1])

    if (code && !localStorage.getItem('token')) {
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
    }
  }, [])

  return children
}

const GitCloneProvider = ({ children }) => {
  const dispatch = useDispatch()

  const user = useSelector(selectors.getUser)

  useEffect(() => {
    const repoLink =
      window &&
      window.location &&
      window.location.href.match(/#(.*)/) &&
      window.location.href.match(/#(.*)/)[1]

    repoLink && createProject({ repoLink, dispatch, user })
  }, [])

  return children
}
