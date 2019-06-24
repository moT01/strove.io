import { createActions, handleActions } from 'redux-actions'
import * as C from 'state/api/constants'

import client from '../../client'

export const Mutation = ({
  name,
  storeKey,
  variables,
  context,
  errorPolicy = 'all',
  mutation,
}) => {
  return async dispatch => {
    dispatch({
      type: C.FETCH_START,
      payload: true,
    })

    try {
      const { data } = await client.mutate({
        mutation,
        context,
        variables,
        fetchPolicy: 'no-cache',
        errorPolicy,
      })

      console.log('data', data)

      dispatch({
        type: C.FETCH_SUCCESS,
        payload: data[name],
      })

      return data[name]
    } catch (e) {
      console.log('fetch error: ', e)
      dispatch({ type: C.FETCH_ERROR, payload: e })
      return null
    }
  }
}

export const Query = ({
  name,
  storeKey,
  variables,
  context,
  fetchPolicy = 'cache-first',
  errorPolicy = 'all',
  query,
}) => {
  return async dispatch => {
    dispatch({
      type: C.FETCH_START,
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
        payload: data[name],
      })

      return data[name]
    } catch (e) {
      console.log('fetch error: ', e)
      dispatch({ type: C.FETCH_ERROR, payload: e })
      return null
    }
  }
}

const createFetchReducers = ({ storeKey, initState, data, loading, error }) =>
  handleActions(
    {
      LOGOUT: state => ({
        ...state,
        user: {
          data: null,
          loading: false,
          error: null,
        },
      }),
      [data]: (state, { payload }) => ({
        ...state,
        [storeKey]: {
          loading: false,
          error: null,
          /* Spread for objects and arrays, assign value directly for primitive */
          data: Array.isArray(payload)
            ? [...payload]
            : typeof payload === 'object'
            ? { ...state[storeKey].data, ...payload }
            : payload,
        },
      }),
      [error]: (state, { payload }) => ({
        ...state,
        [storeKey]: {
          loading: false,
          data: null,
          error: payload,
        },
      }),
      [loading]: (state, { payload }) => ({
        ...state,
        [storeKey]: {
          loading: payload,
          error: null,
          data: { ...state[storeKey].data },
        },
      }),
    },
    initState
  )

/*
  This creates an opinionated way of handling fetch actions.
  It for user store it creates FETCH/USER/LOADING, FETCH/USER/ERROR and
  FETCH/USER/DATA actions and handles data in both object, array and primitive shapes.
*/
export const createFetchModule = ({ storeKey, initialState }) => {
  /* For user it assigns FETCH/USER/DATA to data variable */
  const {
    fetch: {
      user: { data, loading, error },
    },
  } = createActions({
    FETCH: {
      [storeKey]: {
        DATA: data => data,
        LOADING: (isLoading = false) => isLoading,
        ERROR: error => error,
      },
    },
  })

  const initState = initialState || {
    [storeKey]: { loading: false, data: null, error: null },
  }

  return createFetchReducers({ storeKey, initState, data, loading, error })
}
