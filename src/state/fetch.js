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

const auth = async () => {
  try {
    const {
      data: { githubAuth },
    } = await client.mutate({
      mutation: GITHUB_LOGIN,
      variables: { code },
    })
    console.log("githubAuth", githubAuth)
    dispatch({ type: "FETCH/USER/DATA", payload: githubAuth })
  } catch (e) {
    console.log(e)
  }
}

const fetch = ({
  key,
  variables,
  context,
  fetchPolicy = "cache-first",
  errorPolicy = "none",
  query,
  isMutation = false,
}) => {
  return async (dispatch, getState, { client }) => {
    dispatch({ type: `FETCH/${KEY}/LOADING`, payload: true })

    try {
      const {
        data: { githubAuth },
      } = await client.mutate({
        mutation: GITHUB_LOGIN,
        variables: { code },
      })
      console.log("githubAuth", githubAuth)
      dispatch({ type: "FETCH/USER/DATA", payload: githubAuth })
    } catch (e) {
      console.log(e)
    }

    const request = await client[isMutation ? "mutate" : "query"]({
      query,
      variables,
      context,
      fetchPolicy,
      errorPolicy,
    })
    const result = await request
    dispatch({
      type: DEFAULT_ACTION,
      payload: result,
    })
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
