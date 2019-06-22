import { createActions, handleActions } from "redux-actions"

import client from "../../client"

export const mutate = ({
  mutationName,
  storeName,
  variables,
  context,
  errorPolicy = "all",
  mutation,
}) => {
  return async dispatch => {
    dispatch({
      type: `FETCH/${storeName.toUpperCase()}/LOADING`,
      payload: true,
    })

    try {
      const { data } = await client.mutate({
        mutation,
        context,
        variables,
        fetchPolicy: "no-cache",
        errorPolicy,
      })

      dispatch({
        type: `FETCH/${storeName.toUpperCase()}/DATA`,
        payload: data[mutationName],
      })
    } catch (e) {
      console.log("fetch error: ", e)
      dispatch({ type: `FETCH/${storeName.toUpperCase()}/ERROR`, payload: e })
    }
  }
}

export const query = ({
  queryName,
  storeName,
  variables,
  context,
  fetchPolicy = "cache-first",
  errorPolicy = "all",
  query,
}) => {
  return async dispatch => {
    dispatch({
      type: `FETCH/${storeName.toUpperCase()}/LOADING`,
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
        type: `FETCH/${storeName.toUpperCase()}/DATA`,
        payload: data[queryName],
      })
    } catch (e) {
      console.log("fetch error: ", e)
      dispatch({ type: `FETCH/${storeName.toUpperCase()}/ERROR`, payload: e })
    }
  }
}

const createFetchReducers = ({ storeName, initState, data, loading, error }) =>
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
        [storeName]: {
          loading: false,
          error: null,
          data: { ...state[storeName].data, ...payload },
        },
      }),
      [error]: (state, { payload }) => ({
        ...state,
        [storeName]: {
          loading: false,
          data: null,
          error: payload,
        },
      }),
      [loading]: (state, { payload }) => ({
        ...state,
        [storeName]: {
          loading: payload,
          error: null,
          data: { ...state[storeName].data },
        },
      }),
    },
    initState
  )

export const createFetchModule = ({ storeName, initialState }) => {
  const {
    fetch: {
      user: { data, loading, error },
    },
  } = createActions({
    FETCH: {
      [storeName.toUpperCase()]: {
        DATA: data => data,
        LOADING: (isLoading = false) => isLoading,
        ERROR: error => error,
      },
    },
  })

  const initState = initialState || {
    [storeName]: { loading: false, data: null, error: null },
  }

  return createFetchReducers({ storeName, initState, data, loading, error })
}
