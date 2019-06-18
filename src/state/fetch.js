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

// const fetch = ({ key, variables, headers, query }) => {
//   return async (dispatch, getState, { client }) => {
//     dispatch({ type: `FETCH/${KEY}/LOADING`, payload: true })
//     const request = await client.query({
//       query: someQuery,
//       variables: {
//         input: bar,
//       },
//     })
//     const result = await request
//     dispatch({
//       type: DEFAULT_ACTION,
//       payload: result,
//     })
//   }
// }

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
