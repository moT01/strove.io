import { useEffect, memo } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import moment from 'moment'
import { useSubscription } from '@apollo/react-hooks'
import { withRouter } from 'react-router-dom'

import {
  GITHUB_LOGIN,
  GITLAB_LOGIN,
  BITBUCKET_LOGIN,
  MY_PROJECTS,
  ACTIVE_PROJECT,
  START_PROJECT,
  LOGIN_SUBSCRIPTION,
} from 'queries'
import { mutation, query, window, getWindowHref, redirectToEditor } from 'utils'
import { selectors } from 'state'
import { C } from 'state'
import { actions } from 'state'

import client from 'client'

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

export default memo(
  withRouter(({ children, addProject, history }) => {
    const dispatch = useDispatch()
    const user = useSelector(selectors.api.getUser)
    const token = user?.siliskyToken
    const currentProject = useSelector(selectors.api.getCurrentProject)
    const incomingProjectLink = useSelector(
      selectors.incomingProject.getRepoLink
    )
    const githubToken = useSelector(selectors.api.getUserField('githubToken'))
    const gitlabToken = useSelector(selectors.api.getUserField('gitlabToken'))
    const bitbucketRefreshToken = useSelector(
      selectors.api.getUserField('bitbucketRefreshToken')
    )
    const isProjectBeingAdded = useSelector(
      selectors.incomingProject.isProjectBeingAdded
    )

    const isProjectBeingStarted = useSelector(
      selectors.incomingProject.isProjectBeingStarted
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

    const activeProjectData = activeProject?.data?.activeProject
    const machineId = activeProjectData?.machineId
    const editorPort = activeProjectData?.editorPort
    const machineName = activeProjectData?.machineName
    const additionalPorts = activeProjectData?.additionalPorts
    const id = activeProjectData?.id

    console.log('activeProjectData', activeProjectData)

    useEffect(() => {
      dispatch({
        type: C.api.UPDATE_ITEM,
        payload: {
          storeKey: 'myProjects',
          id,
          data: { editorPort, machineId, additionalPorts, machineName },
        },
      })

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [machineName, machineId, editorPort])

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
    const startProjectError = startProjectSubscription?.error

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

        /*
        The "|| !currentProject" part of the login can be removed once api returns projects
        when they are continued as well
      */
        if (queuePosition === 0 && !project && !currentProject) {
          dispatch(
            actions.api.fetchError({
              storeKey: 'startProject',
              error: 'Project start failed',
            })
          )
          dispatch(actions.incomingProject.removeIncomingProject())
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
                    additionalPorts: project.additionalPorts,
                  },
                },
              })
              dispatch(
                actions.api.fetchSuccess({
                  storeKey: 'continueProject',
                  data: true,
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
          redirectToEditor(dispatch, history)
        }

        if (project || currentProject) {
          redirectToEditor(dispatch, history)
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [startProjectData, startProjectError])

    useEffect(() => {
      const code = getWindowHref()
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

        const shouldBeRedirected = stateParams[1] === 'true'

        const origin = stateParams[2]

        if (shouldBeRedirected && origin) {
          const decoredOrigin = decodeURIComponent(origin)

          // Gitlab login makes extremely messy redirect lik strove.io/&code
          const originWithoutParams = decoredOrigin.includes('/&code')
            ? decoredOrigin.split('/&code')[0]
            : decoredOrigin

          const redirectAdress = originWithoutParams.includes('?')
            ? `${originWithoutParams}&code=${code}&state=${gitProvider}`
            : `${originWithoutParams}?code=${code}&state=${gitProvider}`

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

      const checkAwake = () => {
        let then = moment().format('X')
        setInterval(() => {
          let now = moment().format('X')
          if (now - then > 300) {
            token &&
              dispatch(
                query({
                  name: 'myProjects',
                  dataSelector: data => data.myProjects.edges,
                  query: MY_PROJECTS,
                })
              )
          }
          then = now
        }, 2000)
      }

      checkAwake()
      /* eslint-disable-next-line */
    }, [token])

    const loginSubscription = useSubscription(LOGIN_SUBSCRIPTION, {
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
    const loginData = loginSubscription?.data
    const loginError = loginSubscription?.error

    useEffect(() => {
      if (loginError) {
        dispatch(
          actions.api.fetchError({
            storeKey: 'user',
            error: loginError,
          })
        )
      }
      if (loginData?.userLogin) {
        const { siliskyToken, subscription, projects } = loginData?.userLogin
        localStorage.setItem('token', siliskyToken)
        dispatch({
          type: C.api.FETCH_SUCCESS,
          payload: {
            storeKey: 'user',
            data: loginData?.userLogin,
          },
        })
        subscription &&
          dispatch({
            type: C.api.FETCH_SUCCESS,
            payload: {
              storeKey: 'subscription',
              data: subscription,
            },
          })
        projects &&
          dispatch({
            type: C.api.FETCH_SUCCESS,
            payload: {
              storeKey: 'myProjects',
              data: projects,
            },
          })
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loginData, loginError])

    useEffect(() => {
      token &&
        dispatch(
          query({
            name: 'myProjects',
            dataSelector: data => data.myProjects.edges,
            query: MY_PROJECTS,
          })
        )
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token])

    useEffect(() => {
      if (
        token &&
        incomingProjectLink &&
        !isProjectBeingAdded &&
        !isProjectBeingStarted
      ) {
        addProject({ link: incomingProjectLink })
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [incomingProjectLink, isProjectBeingAdded, token])

    useEffect(() => {
      window.addEventListener('beforeunload', ev => {
        ev.preventDefault()

        if (navigator?.sendBeacon && user) {
          console.log(
            'process.env.REACT_APP_STROVE_ENDPOINT',
            process.env.REACT_APP_STROVE_ENDPOINT
          )
          navigator.sendBeacon(
            `${process.env.REACT_APP_STROVE_ENDPOINT}/beacon`,
            JSON.stringify({ token: localStorage.getItem('token') })
          )
        }
      })
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return children
  })
)
