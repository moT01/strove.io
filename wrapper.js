import React, { useEffect } from 'react'
import { ApolloProvider } from 'react-apollo'
import { Provider, useDispatch } from 'react-redux'
import { createStore as reduxCreateStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import thunk from 'redux-thunk'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import { useSelector } from 'react-redux'

import { GITHUB_LOGIN, GITLAB_LOGIN, MY_PROJECTS } from 'queries'
import { mutation, query } from 'utils'
import { window } from 'utils'
import { selectors } from 'state'
import AddProjectProvider from 'components/addProjectProvider'
import client from './client'
import rootReducer from './src/state'
import { C } from 'state'

const createStore = reduxCreateStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
)

export const persistor = persistStore(createStore)

const LoginProvider = ({ children }) => {
  const dispatch = useDispatch()
  const user = useSelector(selectors.api.getUser)

  useEffect(() => {
    const code = window?.location?.href
      .match(/code=(.*)(?=&state)/g)
      ?.toString()
      .split('=')[1]

    const state = window?.location?.href
      ?.match(/state=(.*)/g)
      ?.toString()
      .split('=')[1]

    // Scopes update after buying subscription, may actually be redundant atm
    if (code && user?.subscription?.status === 'active') {
      switch (state) {
        case 'github':
          dispatch(
            mutation({
              mutation: GITHUB_LOGIN,
              variables: { code },
              storeKey: 'user',
              name: 'githubAuth',
              context: null,
            })
          )
          break
        // case 'gitlab':
        //   dispatch(
        //     mutation({
        //       mutation: GITLAB_LOGIN,
        //       variables: { code },
        //       storeKey: 'user',
        //       name: 'gitlabAuth',
        //       context: null,
        //     })
        //   )
        //   break
        // case 'bitbucket':
        //   break
        default:
          break
      }
    }
    // Regular login
    if (code && !localStorage.getItem('token')) {
      switch (state) {
        case 'github':
          dispatch(
            mutation({
              mutation: GITHUB_LOGIN,
              variables: { code },
              storeKey: 'user',
              name: 'githubAuth',
              context: null,
              onSuccess: ({ siliskyToken }) => {
                localStorage.setItem('token', siliskyToken)
              },
              onSuccessDispatch: [
                user => ({
                  type: C.api.FETCH_SUCCESS,
                  payload: {
                    storeKey: 'user',
                    data: user,
                  },
                }),
                ({ subscription }) => ({
                  type: C.api.FETCH_SUCCESS,
                  payload: {
                    storeKey: 'subscription',
                    data: subscription,
                  },
                }),
              ],
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
              context: null,
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

  useEffect(() => {
    user &&
      dispatch(
        query({
          name: 'myProjects',
          dataSelector: data => data.myProjects.edges,
          query: MY_PROJECTS,
        })
      )
  }, [user])

  return children
}

const WithAddProject = ({ children, addProject }) => {
  useEffect(() => {
    let repoLink =
      window?.location?.href?.match(/#(.*)/) &&
      window.location.href.match(/#(.*)/)[1]

    repoLink &&
      /.*(github|gitlab|bitbucket).com/i.test(repoLink) &&
      addProject(repoLink)
  }, [])

  return children
}

export const wrapRootElement = ({ element }) => (
  <>
    <ApolloProvider client={client}>
      <Provider store={createStore}>
        <PersistGate loading={null} persistor={persistor}>
          <LoginProvider>
            <AddProjectProvider>
              {({ addProject }) => (
                <WithAddProject addProject={addProject}>
                  {element}
                </WithAddProject>
              )}
            </AddProjectProvider>
          </LoginProvider>
        </PersistGate>
      </Provider>
    </ApolloProvider>
  </>
)
