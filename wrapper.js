import React, { useEffect, useState } from 'react'
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
  const incomingProjectLink = useSelector(selectors.incomingProject.getRepoLink)
  const githubToken = useSelector(selectors.api.getUserField('githubToken'))
  const gitlabToken = useSelector(selectors.api.getUserField('gitlabToken'))
  const bitbucketRefreshToken = useSelector(
    selectors.api.getUserField('bitbucketRefreshToken')
  )
  const [projectToStop, setProjectToStop] = useState(null)

  const activeProject = useSubscription(ACTIVE_PROJECT, {
    client,
    fetchPolicy: 'no-cache',
    context: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'User-Agent': 'node',
      },
    },
  })

  const syncActiveProject = () => {
    const activeProjectData =
      activeProject?.data && activeProject.data.activeProject
    const machineId = activeProjectData ? activeProjectData.machineId : null
    const editorPort = activeProjectData ? activeProjectData.editorPort : null
    const id = activeProjectData ? activeProjectData.id : projectToStop

    dispatch({
      type: C.api.UPDATE_ITEM,
      payload: {
        storeKey: 'myProjects',
        id,
        data: { editorPort, machineId },
      },
    })

    machineId ? setProjectToStop(id) : setProjectToStop(null)
  }

  const currentProjectSet = result => {
    const currentProject = result.find(item => item.machineId)
    const currentProjectID = currentProject ? currentProject.id : null
    dispatch({
      type: C.api.UPDATE_ITEM,
      payload: {
        storeKey: 'user',
        data: { currentProjectId: currentProjectID },
      },
    })
  }

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
              onSuccess: currentProjectSet,
            })
          )
      }
      then = now
    }, 2000)
  }

  useEffect(() => {
    user && syncActiveProject()
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
    let decoredLoggedUri

    if (loginState) {
      /* %2C is an encoding for , */
      const stateParams = loginState.split('%2C')
      const isOpensource = true // stateParams[1]

      const href = window.location.href
      if (!href.includes('/faq') && isOpensource) {
        return window.location.replace(
          `http://localhost:8000/faq?code=${code}&state=${
            window?.location?.href
              ?.match(/state=(.+)/g)
              ?.toString()
              .split('=')[1]
          }`
        )
      }

      gitProvider = stateParams[0]

      const loggedUri = stateParams[2]
      decoredLoggedUri = decodeURIComponent(loggedUri)
      console.log(
        'stateParams',
        stateParams,
        'decoredLoggedUri',
        decoredLoggedUri
      )
      // if (decoredLoggedUri) {
      //   window.location.replace(decoredLoggedUri)
      // }
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
                  // window.location.replace(
                  //   `http://localhost:8000/app/dashboard?${window?.location?.href
                  //     ?.match(/state=(.+)/g)
                  //     ?.toString()}`
                  // )
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
                onSuccess: ({ siliskyToken }) =>
                  localStorage.setItem('token', siliskyToken),
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
                onSuccess: ({ siliskyToken }) =>
                  localStorage.setItem('token', siliskyToken),
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
