import { useEffect, memo } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import moment from 'moment'
import { useSubscription } from '@apollo/react-hooks'

import {
  GITHUB_LOGIN,
  GITLAB_LOGIN,
  BITBUCKET_LOGIN,
  MY_PROJECTS,
  ACTIVE_PROJECT,
  START_PROJECT,
  USER_LOGIN,
} from 'queries'
import { mutation, query, window, getWindowHref, redirectToEditor } from 'utils'
import { selectors } from 'state'
import { C } from 'state'
import { actions } from 'state'

import client from '../../client'

// Generate unique device id
const generateDeviceID = () => {
  return (
    Math.random()
      .toString(36)
      .substring(2, 15) +
    Math.random()
      .toString(36)
      .substring(2, 15)
  )
}

export default memo(({ children, addProject }) => {
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

  if (!localStorage.getItem('deviceId'))
    localStorage.setItem('deviceId', generateDeviceID())
  const deviceId = localStorage.getItem('deviceId')

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
    shouldResubscribe: true,
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

  const startProjectSubscription = useSubscription(START_PROJECT, {
    variables: { email: user?.email || 'null' },
    client,
    fetchPolicy: 'no-cache',
    context: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'User-Agent': 'node',
      },
    },
    shouldResubscribe: true,
  })

  const startProjectData = startProjectSubscription?.data
  const startProjectError = startProjectSubscription?.error //

  useEffect(() => {
    if (startProjectError) {
      dispatch(
        actions.api.fetchError({
          storeKey: 'startProject',
          error: startProjectError,
        })
      )
    }

    if (startProjectData?.startProject) {
      const {
        startProject: { queuePosition, project, type },
      } = startProjectData
      try {
        dispatch({
          type: C.api.UPDATE_ITEM,
          payload: {
            storeKey: 'user',
            data: {
              queuePosition,
            },
          },
        })
      } catch (e) {
        console.log('Error on showing queue position: ', e)
      }

      if (queuePosition === 0 && !project) {
        dispatch(
          actions.api.fetchError({
            storeKey: 'startProject',
            error: 'Project start failed',
          })
        )
      } else if (queuePosition === 0 && project?.machineId) {
        if (type === 'continueProject') {
          try {
            dispatch({
              type: C.api.UPDATE_ITEM,
              payload: {
                storeKey: 'myProjects',
                id: project.id,
                data: {
                  editorPort: project.editorPort,
                  machineId: project.machineId,
                },
              },
            })
            dispatch(
              actions.api.fetchSuccess({
                storeKey: 'continueProject',
                data: {},
              })
            )
          } catch (e) {
            console.log('error on continueProject in subscription: ', e)
          }
        } else if (type === 'addProject') {
          dispatch(actions.incomingProject.removeIncomingProject())
          dispatch(
            actions.api.fetchSuccess({
              storeKey: 'myProjects',
              data: project,
            })
          )
        }
        redirectToEditor()
      }
    }
  }, [startProjectData, startProjectError])

  let code = null
  useEffect(() => {
    code = getWindowHref()
      .match(/code=([a-z0-9A-Z]+)/g)
      ?.toString()
      .split('=')[1]

    const loginState = getWindowHref()
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

        // console.log('redirectAdress', redirectAdress)

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
                variables: { code, deviceId },
                storeKey: 'user',
                name: 'githubAuth',
                context: null,
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
                variables: { code, deviceId },
                storeKey: 'user',
                name: 'gitlabAuth',
                context: null,
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
                variables: { code, deviceId },
                storeKey: 'user',
                name: 'bitbucketAuth',
                context: null,
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

  ////////////
  const userDataSubscription = useSubscription(USER_LOGIN, {
    variables: { deviceId },
    client,
    fetchPolicy: 'no-cache',
    context: {
      headers: {
        'User-Agent': 'node',
      },
    },
    shouldResubscribe: true,
  })

  const userData = userDataSubscription?.data
  const userError = userDataSubscription?.error

  useEffect(() => {
    if (userError) {
      dispatch(
        actions.api.fetchError({
          storeKey: 'user',
          error: userError,
        })
      )
    }
    if (userData?.userLogin) {
      const { siliskyToken, subscription } = userData?.userLogin
      localStorage.setItem('token', siliskyToken)
      dispatch({
        type: C.api.FETCH_SUCCESS,
        payload: {
          storeKey: 'user',
          data: userData?.userLogin,
        },
      })
      dispatch({
        type: C.api.FETCH_SUCCESS,
        payload: {
          storeKey: 'subscription',
          data: subscription,
        },
      })
    }
  }, [userData, userError])

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
      addProject({ link: incomingProjectLink })
    }
  }, [projects.length])

  useEffect(() => {
    window.addEventListener('beforeunload', ev => {
      ev.preventDefault()

      if (navigator?.sendBeacon && user) {
        navigator.sendBeacon(
          `${process.env.SILISKY_ENDPOINT}/beacon`,
          JSON.stringify({ token: localStorage.getItem('token') })
        )
      }
    })
  }, [])

  return children
})
