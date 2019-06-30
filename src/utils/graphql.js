import * as C from 'state/api/constants'

import defaultClient from '../../client'

/**
 * Gracefully handle mutations
 * @param {Object} objectParam mutation takes one param will all the details, like variables living inside
 * @param {string} objectParam.name - Name of the mutation, for example githubAuth
 * @param {string} objectParam.storeKey - Key where mutation result will be stored unless a custom onSuccessAction or onErrorAction are provided
 * @param {string} objectParam.variables - Mutation variables
 * @param {string} objectParam.context - Mutation context
 * @param {string} objectParam.errorPolicy - Mutation errorPolicy
 * @param {string} objectParam.mutation - Actual mutation
 * @param {string} objectParam.onSuccess - Function called with the result after mutation succeeds
 * @param {string} objectParam.onError - Function called with the error after mutation fails
 * @param {fun} objectParam.onSuccessAction - Function called with the result - returns action dispatch
 * @param {fun} objectParam.onSuccessError - Function called with the error - returns action dispatch
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
  onSuccessAction,
  onErrorAction,
  dataSelector = data => data[name],
  client = defaultClient,
}) => {
  return async dispatch => {
    dispatch({
      type: C.FETCH_START,
      payload: { storeKey },
    })

    try {
      const { data } = await client.mutate({
        mutation,
        context,
        variables,
        fetchPolicy: 'no-cache',
        errorPolicy,
      })

      onSuccess && onSuccess(dataSelector(data))

      onSuccessAction && dispatch(onSuccessAction(dataSelector(data)))

      dispatch({
        type: C.FETCH_SUCCESS,
        payload: { storeKey, data: dataSelector(data) },
      })

      return dataSelector(data)
    } catch (error) {
      console.log('fetch error: ', error)

      onError && onError(error)

      onErrorAction && dispatch(onErrorAction(e))

      dispatch({ type: C.FETCH_ERROR, storeKey, payload: { error, storeKey } })
      return null
    }
  }
}

/**
 * Gracefully handle query
 * @param {Object} objectParam mutation takes one param will all the details, like variables living inside
 * @param {string} objectParam.name - Name of the mutation, for example githubAuth
 * @param {string} objectParam.storeKey - Key where mutation result will be stored unless a custom onSuccessAction or onErrorAction are provided
 * @param {string} objectParam.variables - Mutation variables
 * @param {string} objectParam.context - Mutation context
 * @param {string} objectParam.errorPolicy - Mutation errorPolicy
 * @param {string} objectParam.query - Actual query
 * @param {string} objectParam.onSuccess - Function called with the result after mutation succeeds
 * @param {string} objectParam.onError - Function called with the error after mutation fails
 * @param {fun} objectParam.onSuccessAction - Function called with the result - returns action dispatch
 * @param {fun} objectParam.onSuccessError - Function called with the error - returns action dispatch
 */
export const query = ({
  name,
  storeKey = name,
  variables,
  context,
  fetchPolicy = 'cache-first',
  errorPolicy = 'all',
  query,
  onSuccess,
  onError,
  onSuccessAction,
  onErrorAction,
  dataSelector = data => data[name],
  client = defaultClient,
}) => {
  return async dispatch => {
    dispatch({
      type: C.FETCH_START,
      payload: { storeKey },
    })

    try {
      const { data } = await client.query({
        query,
        context,
        variables,
        fetchPolicy,
        errorPolicy,
      })

      onSuccess && onSuccess(dataSelector(data))

      onSuccessAction && dispatch(onSuccessAction(dataSelector(data)))

      dispatch({
        type: C.FETCH_SUCCESS,
        payload: { data: dataSelector(data), storeKey },
      })

      return dataSelector(data)
    } catch (error) {
      console.log('fetch error: ', error)

      onSuccess && onError(error)

      onErrorAction && dispatch(onErrorAction(e))

      dispatch({ type: C.FETCH_ERROR, payload: { error, storeKey } })
      return null
    }
  }
}
