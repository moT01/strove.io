import ReactGA from 'react-ga'
import { C, actions } from 'state'

import defaultClient from 'client'

/**
 * Gracefully handle mutations. Handles all the async aspects of querying, automatically dispatches redux
 * actions for loading, error and success. Adds ability to handle success and error outside of redux,
 * for example to set localStorage.
 * @param {Object} objectParam mutation takes one param will all the details, like variables living inside
 * @param {string} objectParam.name - Name of the mutation, for example githubAuth
 * @param {string} objectParam.storeKey - Key where mutation result will be stored unless a custom onSuccessDispatch or onErrorDispatch are provided
 * @param {string} objectParam.variables - Mutation variables
 * @param {string} objectParam.context - Mutation context
 * @param {string} objectParam.errorPolicy - Mutation errorPolicy, defaults to all
 * @param {string} objectParam.mutation - Actual mutation
 * @param {function} objectParam.onSuccess - Function called with the result after mutation succeeds. Example: user => localStorage.setItem('token', user.token)
 * @param {function} objectParam.onError - Function called with the error after mutation fails. Example: () => localStorage.removeItem('token')
 * @param {function} objectParam.onSuccessDispatch - Function called with the result - returns action dispatch. Example: user => ({ type: "USER_LOGIN_SUCCESS", payload: user })
 * @param {function} objectParam.onSuccessError - Function called with the error - returns action dispatch. Example: error => ({ type: "USER_LOGIN_ERROR", payload: error })
 * @param {function} objectParam.dataSelector - Function used to get result data, useful for example for paginated results like data.myProjects.edges
 * @param {string} objectParam.client - GraphQL client, for example Github. Defaults to Silisky
 */
export const mutation = ({
  name,
  storeKey = name,
  variables,
  context = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'User-Agent': 'node',
    },
  },
  errorPolicy = 'all',
  mutation,
  onLoading,
  onSuccess,
  onError,
  onLoadingDispatch,
  onSuccessDispatch,
  onErrorDispatch,
  dataSelector = data => data[name],
  client = defaultClient,
}) => {
  return async dispatch => {
    onLoading && onLoading(storeKey)
    if (onLoadingDispatch) {
      if (Array.isArray(onLoadingDispatch)) {
        onLoadingDispatch.forEach(action => dispatch(action(storeKey)))
      } else {
        dispatch(onLoadingDispatch(storeKey))
      }
    } else {
      dispatch({
        type: C.api.FETCH_START,
        payload: { storeKey },
      })
    }

    const requestStartTime = performance.now()

    try {
      const { data } = await client.mutate({
        mutation,
        context,
        variables,
        fetchPolicy: 'no-cache',
        errorPolicy,
      })

      const result = dataSelector(data)

      if (result) {
        const requestEndTime = performance.now()
        const requestTime = requestEndTime - requestStartTime
        if (name === 'resetCron') {
          dispatch(actions.latency.fullLatencyMeasurement(requestTime))
        }
        ReactGA.timing({
          category: 'Request Performace',
          variable: name,
          value: requestTime,
        })

        console.log('Request Performace', requestTime)
      }

      if (onSuccess) {
        if (Array.isArray(onSuccess)) {
          onSuccess.forEach(func => func(result))
        } else {
          onSuccess(result)
        }
      }

      if (onSuccessDispatch) {
        if (Array.isArray(onSuccessDispatch)) {
          onSuccessDispatch.forEach(action => dispatch(action(result)))
        } else {
          dispatch(onSuccessDispatch(result))
        }
      } else if (onSuccessDispatch !== null) {
        dispatch({
          type: C.api.FETCH_SUCCESS,
          payload: { storeKey, data: result },
        })
      }

      const requestHandlingEndTime = performance.now()
      ReactGA.timing({
        category: 'Request Handling Performance',
        variable: name,
        value: requestHandlingEndTime - requestStartTime,
      })

      console.log(
        'Request Handling Performace',
        requestHandlingEndTime - requestStartTime,
        name
      )

      return result
    } catch (error) {
      console.log('Error', error)
      onError && onError(error)

      if (onErrorDispatch) {
        if (Array.isArray(onErrorDispatch)) {
          onErrorDispatch.forEach(action => dispatch(action(error)))
        } else {
          dispatch(onErrorDispatch(error))
        }
      } else {
        dispatch({
          type: C.api.FETCH_ERROR,
          storeKey,
          payload: { error, storeKey },
        })
      }

      const requestEndTime = performance.now()
      ReactGA.timing({
        category: 'Request Error Performance',
        variable: name,
        value: requestEndTime - requestStartTime,
      })

      console.log(
        'Request Error Performace',
        requestEndTime - requestStartTime,
        name
      )

      return null
    }
  }
}

/**
 * Gracefully handle queries. Handles all the async aspects of querying, automatically dispatches redux
 * actions for loading, error and success. Adds ability to handle success and error outside of redux,
 * for example to set localStorage.
 * @param {Object} objectParam mutation takes one param will all the details, like variables living inside
 * @param {string} objectParam.name - Name of the mutation, for example githubAuth
 * @param {string} objectParam.storeKey - Key where mutation result will be stored unless a custom onSuccessDispatch or onErrorDispatch are provided
 * @param {string} objectParam.variables - Mutation variables
 * @param {string} objectParam.context - Mutation context
 * @param {string} objectParam.errorPolicy - Mutation fetchPolicy, defaults to cache-first
 * @param {string} objectParam.errorPolicy - Mutation errorPolicy, defaults to all
 * @param {string} objectParam.query - Actual query
 * @param {function} objectParam.onSuccess - Function called with the result after query succeeds. Example: user => localStorage.setItem('token', user.token)
 * @param {function} objectParam.onError - Function called with the error after query fails. Example: () => localStorage.removeItem('token')
 * @param {function} objectParam.onSuccessDispatch - Function called with the result - returns action dispatch. Example: user => ({ type: "USER_LOGIN_SUCCESS", payload: user })
 * @param {function} objectParam.onErrorDispatch - Function called with the error - returns action dispatch. Example: error => ({ type: "USER_LOGIN_ERROR", payload: error })
 * @param {function} objectParam.dataSelector - Function used to get result data, useful for example for paginated results like data.myProjects.edges
 * @param {string} objectParam.client - GraphQL client, for example Github. Defaults to Silisky
 */

export const query = ({
  name,
  storeKey = name,
  variables,
  context = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'User-Agent': 'node',
    },
  },
  fetchPolicy = 'no-cache',
  errorPolicy = 'all',
  query,
  onLoading,
  onSuccess,
  onError,
  onLoadingDispatch,
  onSuccessDispatch,
  onErrorDispatch,
  dataSelector = data => data[name],
  client = defaultClient,
}) => {
  return async dispatch => {
    onLoading && onLoading(storeKey)
    if (onLoadingDispatch) {
      if (Array.isArray(onLoadingDispatch)) {
        onLoadingDispatch.forEach(action => dispatch(action(storeKey)))
      } else {
        dispatch(onLoadingDispatch(storeKey))
      }
    } else {
      dispatch({
        type: C.api.FETCH_START,
        payload: { storeKey },
      })
    }

    const requestStartTime = performance.now()

    try {
      const { data } = await client.query({
        query,
        context,
        variables,
        fetchPolicy,
        errorPolicy,
      })

      const result = dataSelector(data)

      if (result) {
        const requestEndTime = performance.now()
        const requestTime = requestEndTime - requestStartTime
        if (name === 'resetCron') {
          dispatch(actions.latency.fullLatencyMeasurement(requestTime))
        }
        ReactGA.timing({
          category: 'Request Performace',
          variable: name,
          value: requestTime,
        })

        console.log('Request Performace', requestTime)
      }

      if (onSuccess) {
        if (Array.isArray(onSuccess)) {
          onSuccess.forEach(func => func(result))
        } else {
          onSuccess(result)
        }
      }

      if (onSuccessDispatch) {
        if (Array.isArray(onSuccessDispatch)) {
          onSuccessDispatch.forEach(action => dispatch(action(result)))
        } else {
          dispatch(onSuccessDispatch(result))
        }
      } else {
        dispatch({
          type: C.api.FETCH_SUCCESS,
          payload: { storeKey, data: result },
        })
      }

      const requestHandlingEndTime = performance.now()
      ReactGA.timing({
        category: 'Request Handling Performance',
        variable: name,
        value: requestHandlingEndTime - requestStartTime,
      })
      console.log(
        'Request Handling Performace',
        requestHandlingEndTime - requestStartTime,
        name
      )

      return result
    } catch (error) {
      console.log('fetch error: ', error)

      onError && onError(error)
      if (onErrorDispatch) {
        if (Array.isArray(onErrorDispatch)) {
          onErrorDispatch.forEach(action => dispatch(action(error)))
        } else {
          dispatch(onErrorDispatch(error))
        }
      } else {
        dispatch({
          type: C.api.FETCH_ERROR,
          storeKey,
          payload: { error, storeKey },
        })
      }

      const requestEndTime = performance.now()
      ReactGA.timing({
        category: 'Request Error Performance',
        variable: name,
        value: requestEndTime - requestStartTime,
      })

      console.log(
        'Request Error Performace',
        requestEndTime - requestStartTime,
        name
      )

      return null
    }
  }
}
