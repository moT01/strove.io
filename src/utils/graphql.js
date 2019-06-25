import * as C from 'state/api/constants'

import defaultClient from '../../client'

export const mutation = ({
  name,
  storeKey = name,
  variables,
  context,
  errorPolicy = 'all',
  mutation,
  onSuccess,
  onError,
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

      dispatch({
        type: C.FETCH_SUCCESS,
        payload: { storeKey, data: dataSelector(data) },
      })

      return dataSelector(data)
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

      dispatch({
        type: C.FETCH_SUCCESS,
        payload: { data: dataSelector(data), storeKey },
      })

      return dataSelector(data)
    } catch (error) {
      console.log('fetch error: ', error)

      onSuccess && onError(error)

      dispatch({ type: C.FETCH_ERROR, payload: { error, storeKey } })
      return null
    }
  }
}
