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
  onError,
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

      onSuccess && onSuccess(data[name])

      dispatch({
        type: C.FETCH_SUCCESS,
        payload: { storeKey, data: data[name] },
      })

      return data[name]
    } catch (error) {
      console.log('fetch error: ', error)

      onError && onError(error)

      dispatch({ type: C.FETCH_ERROR, storeKey, payload: { error, storeKey } })
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
  onError,
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

      onSuccess && onSuccess(data[name])

      dispatch({
        type: C.FETCH_SUCCESS,
        payload: { data: data[name], storeKey },
      })

      return data[name]
    } catch (error) {
      console.log('fetch error: ', error)

      onSuccess && onError(error)

      dispatch({ type: C.FETCH_ERROR, payload: { error, storeKey } })
      return null
    }
  }
}
