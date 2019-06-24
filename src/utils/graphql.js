import * as C from 'state/api/constants'

import client from '../../client'

export const mutation = ({
  name,
  storeKey = name,
  variables,
  context,
  errorPolicy = 'all',
  mutation,
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

      dispatch({
        type: C.FETCH_SUCCESS,
        payload: { storeKey, data: data[name] },
      })

      return data[name]
    } catch (e) {
      console.log('fetch error: ', e)
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

      dispatch({
        type: C.FETCH_SUCCESS,
        payload: { data: data[name], storeKey },
      })

      return data[name]
    } catch (e) {
      console.log('fetch error: ', e)
      dispatch({ type: C.FETCH_ERROR, storeKey, payload: e })
      return null
    }
  }
}
