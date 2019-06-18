import {
  createActions,
  handleActions,
  handleAction,
  combineActions,
} from "redux-actions"

const createFetchReducers = ({
  storeName,
  defaultState,
  data,
  loading,
  error,
}) =>
  handleActions(
    {
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
          data: { ...state[storeName].data },
          error: false,
        },
      }),
    },
    defaultState
  )

const createFetchModule = ({ storeName, defaultState }) => {
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

  return createFetchReducers({ storeName, defaultState, data, loading, error })
}

const userModule = createFetchModule({
  storeName: "user",
  defaultState: { user: { loading: false, data: null, error: null } },
})

console.log("fefefeffeffefefefefe", userModule)
// const {
//   fetch: {
//     user: { data, loading, error },
//   },
// } = createActions({
//   FETCH: {
//     USER: {
//       DATA: data => data,
//       LOADING: (isLoading = false) => isLoading,
//       ERROR: error => error,
//     },
//   },
// })

// const reducer = handleActions(
//   {
//     [data]: (state, { payload }) => ({
//       ...state,
//       user: {
//         loading: false,
//         error: null,
//         data: { ...state.user.data, ...payload },
//       },
//     }),
//     [error]: (state, { payload }) => ({
//       ...state,
//       user: { loading: false, data: null, error: payload },
//     }),
//     [loading]: (state, { payload }) => ({
//       ...state,
//       user: { ...state.user, loadin: payload },
//     }),
//   },
//   defaultState
// )

export default userModule
