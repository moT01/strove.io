import {
  createActions,
  handleActions,
  handleAction,
  combineActions,
} from "redux-actions"

const createFetchReducers = ({ storeName, initState, data, loading, error }) =>
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
    initState
  )

const createFetchModule = ({ storeName, initialState }) => {
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

const userModule = createFetchModule({
  storeName: "user",
})

export default userModule
