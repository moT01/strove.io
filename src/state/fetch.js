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
    // [combineActions(increment, decrement)]: (
    //   state,
    //   { payload: { amount } }
    // ) => {
    //   return { ...state, counter: state.counter + amount };
    // }
  },
  defaultState
)
// const reducer = handleActions(
//   getUser,
//   (state, action) => ({ user: action.payload }),
//   {
//     [combineActions(increment, decrement)]: (
//       state,
//       { payload: { amount } }
//     ) => {
//       return { ...state, counter: state.counter + amount }
//     },
//   },
//   defaultState
// )

// import { createAction, handleAction } from "redux-actions"

// const defaultState = { user: null }

// const { getUser } = createAction("GET_USER", user => ({ ...user }))

// const reducer = handleAction(
//   "GET_USER",
//   (state, action) => ({ user: action.payload }),
//   defaultState
// )

export default reducer
