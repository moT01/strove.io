import React, { useEffect } from 'react'
import { ApolloProvider } from 'react-apollo'
import { Provider, useDispatch } from 'react-redux'
import { createStore as reduxCreateStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import thunk from 'redux-thunk'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import { useSelector } from 'react-redux'
import moment from 'moment'
import { useSubscription } from '@apollo/react-hooks'

import {
  GITHUB_LOGIN,
  GITLAB_LOGIN,
  BITBUCKET_LOGIN,
  MY_PROJECTS,
  ACTIVE_PROJECT,
} from 'queries'
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

const LoginProvider = ({ children, addProject }) => {
  const dispatch = useDispatch()
  const user = useSelector(selectors.api.getUser)
  const projects = useSelector(selectors.api.getUserProjects)
  const currentProject = useSelector(selectors.api.getCurrentProject)
  const incomingProjectLink = useSelector(selectors.incomingProject.getRepoLink)
  const githubToken = useSelector(selectors.api.getUserField('githubToken'))
  const gitlabToken = useSelector(selectors.api.getUserField('gitlabToken'))
  const bitbucketRefreshToken = useSelector(
    selectors.api.getUserField('bitbucketRefreshToken')
  )

  const activeProject = useSubscription(ACTIVE_PROJECT, {
    variables: { email: user?.email || 'null' },
    client,
    fetchPolicy: 'no-cache',
    context: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'User-Agent': 'node',
      },
    },
  })

  const activeProjectData =
    activeProject?.data?.activeProject?.machineId &&
    activeProject?.data?.activeProject
  const machineId = activeProjectData?.machineId
  const editorPort = activeProjectData?.editorPort
  const id = activeProjectData?.id

  const checkAwake = () => {
    let then = moment().format('X')
    setInterval(() => {
      let now = moment().format('X')
      if (now - then > 300) {
        user &&
          dispatch(
            query({
              name: 'myProjects',
              dataSelector: data => data.myProjects.edges,
              query: MY_PROJECTS,
              onSuccess: () =>
                dispatch({
                  type: C.api.UPDATE_ITEM,
                  payload: {
                    storeKey: 'myProjects',
                    id,
                    data: {
                      editorPort,
                      machine: machineId,
                    },
                  },
                }),
            })
          )
      }
      then = now
    }, 2000)
  }

  useEffect(() => {
    if (editorPort) {
      dispatch({
        type: C.api.UPDATE_ITEM,
        payload: {
          storeKey: 'myProjects',
          id,
          data: { editorPort, machineId },
        },
      })
    } else if (currentProject) {
      dispatch({
        type: C.api.UPDATE_ITEM,
        payload: {
          storeKey: 'myProjects',
          id: currentProject.id,
          data: { editorPort, machineId },
        },
      })
    }
  }, [activeProject.data])

  useEffect(() => {
    const code = window?.location?.href
      .match(/code=([a-z0-9A-Z]+)/g)
      ?.toString()
      .split('=')[1]

    const loginState = window?.location?.href
      ?.match(/state=(.+)/g)
      ?.toString()
      .split('=')[1]

    let gitProvider

    if (loginState) {
      /* %2C is an encoding for , */
      const stateParams = loginState.split('%2C')

      gitProvider = stateParams[0]

      const shouldBeRedirected = stateParams[1]

      const origin = stateParams[2]

      if (shouldBeRedirected && origin) {
        const decoredOrigin = decodeURIComponent(origin)

        // Gitlab login makes extremely messy redirect lik strove.io/&code
        const originWithoutParams = decoredOrigin.includes('/&code')
          ? decoredOrigin.split('/&code')[0]
          : decoredOrigin

        const redirectAdress = `${originWithoutParams}?code=${code}&state=${gitProvider}`

        /* Redirect to project */
        return window.location.replace(redirectAdress)
      }
    }

    if (code) {
      switch (gitProvider) {
        case 'github': {
          if (!localStorage.getItem('token') || !githubToken) {
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
          }
          break
        }
        case 'gitlab': {
          if (!localStorage.getItem('token') || !gitlabToken) {
            dispatch(
              mutation({
                mutation: GITLAB_LOGIN,
                variables: { code },
                storeKey: 'user',
                name: 'gitlabAuth',
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
          }
          break
        }
        case 'bitbucket': {
          if (!localStorage.getItem('token') || !bitbucketRefreshToken) {
            dispatch(
              mutation({
                mutation: BITBUCKET_LOGIN,
                variables: { code },
                storeKey: 'user',
                name: 'bitbucketAuth',
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
          }
          break
        }
        default:
          break
      }
    }
    checkAwake()
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

  useEffect(() => {
    if (user && incomingProjectLink) {
      addProject(incomingProjectLink)
    }
  }, [projects.length])

  useEffect(() => {
    window.addEventListener('beforeunload', ev => {
      ev.preventDefault()

      if (navigator && navigator.sendBeacon) {
        navigator.sendBeacon(
          `${process.env.SILISKY_ENDPOINT}/beacon`,
          JSON.stringify({ token: localStorage.getItem('token') })
        )
      }
    })
  }, [])

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
  <ApolloProvider client={client}>
    <Provider store={createStore}>
      <PersistGate loading={null} persistor={persistor}>
        <AddProjectProvider>
          {({ addProject }) => (
            <LoginProvider addProject={addProject}>
              <WithAddProject addProject={addProject}>{element}</WithAddProject>
            </LoginProvider>
          )}
        </AddProjectProvider>
      </PersistGate>
    </Provider>
  </ApolloProvider>
)
