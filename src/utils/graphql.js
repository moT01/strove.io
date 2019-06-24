import * as C from 'state/api/constants'

import client from '../../client'

export const mutation = ({
  name,
  storeKey = name,
  variables,
  context,
  errorPolicy = 'all',
  mutation,
  onSuccess,
  onFailure,
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

      onSuccess && onSuccess()

      dispatch({
        type: C.FETCH_SUCCESS,
        payload: { storeKey, data: data[name] },
      })

      return data[name]
    } catch (e) {
      console.log('fetch error: ', e)

      onFailure && onFailure()

      dispatch({ type: C.FETCH_ERROR, storeKey, payload: e })
      return null
    }
  }
}

export const query = ({
  name,
  storeKey = name,
  variables,
  context,
  fetchPolicy = 'cache-first',
  errorPolicy = 'all',
  query,
  onSuccess,
  onFailure,
}) => {
  return async dispatch => {
    dispatch({
      type: C.FETCH_START,
      storeKey,
      payload: true,
    })

    try {
      const { data } = await client.query({
        query,
        context,
        variables,
        fetchPolicy,
        errorPolicy,
      })

      onSuccess && onSuccess()

      dispatch({
        type: C.FETCH_SUCCESS,
        payload: { data: data[name], storeKey },
      })

      return data[name]
    } catch (e) {
      console.log('fetch error: ', e)

      onSuccess && onFailure()

      dispatch({ type: C.FETCH_ERROR, storeKey, payload: e })
      return null
    }
  }
}
