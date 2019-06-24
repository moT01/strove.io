import { createActions, handleActions } from 'redux-actions'
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
