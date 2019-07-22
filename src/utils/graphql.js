import * as C from 'state/api/constants'

import defaultClient from '../../client'

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
 * @param {function} objectParam.onSuccess - Function called with the result after mutation succeeds. Example: user => localStorage.setItem('token', user.siliskyToken)
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
  context,
  errorPolicy = 'all',
  mutation,
  onSuccess,
  onError,
  onLoadingDispatch,
  onSuccessDispatch,
  onErrorDispatch,
  dataSelector = data => data[name],
  client = defaultClient,
}) => {
  return async dispatch => {
    dispatch({
      type: C.FETCH_START,
      payload: { storeKey },
    })

    onLoadingDispatch && dispatch(onLoadingDispatch({ storeKey }))

    try {
      const { data } = await client.mutate({
        mutation,
        context,
        variables,
        fetchPolicy: 'no-cache',
        errorPolicy,
      })

      const result = dataSelector(data)

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
          type: C.FETCH_SUCCESS,
          payload: { storeKey, data: result },
        })
      }

      return dataSelector(data)
    } catch (error) {
      onError && onError(error)

      if (onErrorDispatch) {
        if (Array.isArray(onErrorDispatch)) {
          onSuccessDispatch.forEach(action => dispatch(action(error)))
        } else {
          dispatch(onSuccessDispatch(error))
        }
      }
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
 * @param {function} objectParam.onSuccess - Function called with the result after query succeeds. Example: user => localStorage.setItem('token', user.siliskyToken)
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
  context,
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
    dispatch({
      type: C.FETCH_START,
      payload: { storeKey },
    })

    onLoading && onLoading({ storeKey })
    onLoadingDispatch && dispatch(onLoadingDispatch({ storeKey }))

    try {
      const { data } = await client.query({
        query,
        context,
        variables,
        fetchPolicy,
        errorPolicy,
      })

      const result = dataSelector(data)

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
          type: C.FETCH_SUCCESS,
          payload: { storeKey, data: result },
        })
      }

      return result
    } catch (error) {
      console.log('fetch error: ', error)

      onError && onError(error)
      onErrorDispatch && dispatch(onErrorDispatch(error))

      dispatch({ type: C.FETCH_ERROR, payload: { error, storeKey } })
      return null
    }
  }
}
