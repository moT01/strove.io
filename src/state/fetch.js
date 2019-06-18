import {
  createActions,
  handleActions,
  handleAction,
  combineActions,
} from "redux-actions"

const defaultState = { user: null }

const {
  get: {
    user: { data, loading, error },
  },
} = createActions({
  // GET_USER: user => ({ ...user }),
  GET: {
    USER: {
      DATA: user => ({ ...user }),
      LOADING: (isLoading = false) => ({ isLoading }),
      ERROR: error => ({ ...error }),
    },
  },
})

// const reducer = handleActions(
//   {
//     [combineActions(data, loading, error)]: (
//       state,
//       { payload: { amount } }
//     ) => {
//       return { ...state, counter: state.counter + amount };
//     }
//   },
//   defaultState
// );

const reducer = handleAction(
  data,
  (state, action) => ({ user: action.payload }),
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
