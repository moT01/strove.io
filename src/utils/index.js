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

const createFetchReducers = actions => {
  const args = actions.map(
    ({
      storeName,
      initState = {
        [storeName]: { loading: false, data: null, error: null },
      },
      data,
      loading,
      error,
    }) => ({
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
  )

  console.log("args", args)
}

// const createFetchReducers = ({ storeName, initState, data, loading, error }) =>
//   handleActions(
//     {
//       LOGOUT: state => ({
//         ...state,
//         user: {
//           data: null,
//           loading: false,
//           error: null,
//         },
//       }),
//       [data]: (state, { payload }) => ({
//         ...state,
//         [storeName]: {
//           loading: false,
//           error: null,
//           /* Spread for objects and arrays, assign value directly for primitive */
//           data: Array.isArray(payload)
//             ? [...payload]
//             : typeof payload === "object"
//             ? { ...state[storeName].data, ...payload }
//             : payload,
//         },
//       }),
//       [error]: (state, { payload }) => ({
//         ...state,
//         [storeName]: {
//           loading: false,
//           data: null,
//           error: payload,
//         },
//       }),
//       [loading]: (state, { payload }) => ({
//         ...state,
//         [storeName]: {
//           loading: payload,
//           error: null,
//           data: { ...state[storeName].data },
//         },
//       }),
//     },
//     initState
//   )

export const createFetchModule = submodules => {
  const actions = submodules.map(({ storeName, initialState }) => {
    console.log("dvdfdvedvev", storeName, data)
    const data = `FETCH/${storeName}/DATA`
    const loading = `FETCH/${storeName}/LOADING`
    const error = `FETCH/${storeName}/ERROR`

    return { data, loading, error, storeName, initialState }
  })

  console.log("actions", actions)

  return createFetchReducers(actions)
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
