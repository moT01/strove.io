import {
  createActions,
  handleActions,
  handleAction,
  combineActions,
} from "redux-actions"

const defaultState = { user: null }

const {
  fetch: {
    user: { data, loading, error },
  },
} = createActions({
  FETCH: {
    USER: {
      DATA: data => data,
      LOADING: (isLoading = false) => isLoading,
      ERROR: error => error,
    },
  },
})

export const fetchData = ({
  mutationName,
  storeName,
  variables,
  context,
  fetchPolicy = "cache-first",
  errorPolicy = "none",
  query,
  isMutation = false,
}) => {
  return async (dispatch, getState, { client }) => {
    dispatch({ type: `FETCH/${storeName}/LOADING`, payload: true })

    try {
      const { data } = await client[isMutation ? "mutate" : "query"]({
        query,
        variables,
        context,
        fetchPolicy,
        errorPolicy,
      })

      dispatch({ type: `FETCH/${storeName}/DATA`, payload: data[mutationName] })
    } catch (e) {
      dispatch({ type: `FETCH/${storeName}/ERROR`, payload: e })
    }
  }
}

const reducer = handleActions(
  {
    [data]: (state, { payload }) => ({
      ...state,
      user: { loading: false, error: null, data: payload },
    }),
    [error]: (state, { payload }) => ({
      ...state,
      user: { loading: false, data: null, error: payload },
    }),
    [loading]: (state, { payload }) => ({
      ...state,
      user: { ...state.user, loadin: payload },
    }),
  },
  defaultState
)

export default reducer
