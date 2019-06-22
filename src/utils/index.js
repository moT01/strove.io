import { createActions, createAction, handleActions } from "redux-actions"

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

      return data[mutationName]
    } catch (e) {
      console.log("fetch error: ", e)
      dispatch({ type: `FETCH/${storeName.toUpperCase()}/ERROR`, payload: e })
      return null
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

      return data[queryName]
    } catch (e) {
      console.log("fetch error: ", e)
      dispatch({ type: `FETCH/${storeName.toUpperCase()}/ERROR`, payload: e })
      return null
    }
  }
}

const createFetchReducers = ({ storeName, data, loading, error }) => ({
  [data]: (state, { payload }) => ({
    ...state,
    [storeName]: {
      loading: false,
      error: null,
      /* Spread for objects and arrays, assign value directly for primitive */
      data: Array.isArray(payload)
        ? [...payload]
        : typeof payload === "object"
        ? { ...state[storeName].data, ...payload }
        : payload,
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
})

export const createFetchModule = submodules => {
  const actions = submodules.map(({ storeName, initialState }) => {
    const data = createAction(`FETCH/${storeName.toUpperCase()}/DATA`)
    const loading = createAction(`FETCH/${storeName.toUpperCase()}/LOADING`)
    const error = createAction(`FETCH/${storeName.toUpperCase()}/ERROR`)

    return { data, loading, error, storeName }
  })

  const initState = {
    user: { loading: false, data: null, error: null },
    projects: { loading: false, data: [], error: null },
  }

  // console.log(
  //   "almostReducers",
  //   actions.map(action => createFetchReducers(action))
  // )

  const arrayToObject = array =>
    array.reduce(
      (obj, item) => {
        return { ...obj, item }
      },
      {
        LOGOUT: (state, { payload }) => initState,
      }
    )

  return handleActions(
    arrayToObject(actions.map(action => createFetchReducers(action))),
    initState
  )
}
/*
  This creates an opinionated way of handling fetch actions.
  It for user store it creates FETCH/USER/LOADING, FETCH/USER/ERROR and
  FETCH/USER/DATA actions and handles data in both object, array and primitive shapes.
*/

// export const createFetchModule = ({ storeName, initialState }) => {
//   /* For user it assigns FETCH/USER/DATA to data variable */
//   const {
//     fetch: {
//       user: { data, loading, error },
//     },
//   } = createActions({
//     FETCH: {
//       [storeName.toUpperCase()]: {
//         DATA: data => data,
//         LOADING: (isLoading = false) => isLoading,
//         ERROR: error => error,
//       },
//     },
//   })

//   const initState = initialState || {
//     [storeName]: { loading: false, data: null, error: null },
//   }

//   return createFetchReducers({ storeName, initState, data, loading, error })
// }
