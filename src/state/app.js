// import { createActions, handleActions, combineActions } from "redux-actions"

// const defaultState = { user: null }

// const { getUser } = createActions({
//   GET_USER: user => ({ ...user }),
//   // FETCH: {
//   //   USER: {
//   //     DATA: user => ({ ...user }),
//   //     LOADING: (isLoading = false) => ({ isLoading }),
//   //     ERROR: error => ({ ...error })
//   //   }
//   // }
// })

// const reducer = handleActions(
//   getUser,
//   (state, action) => ({ user: action.payload }),
//   // {
//   //   [combineActions(increment, decrement)]: (
//   //     state,
//   //     { payload: { amount } }
//   //   ) => {
//   //     return { ...state, counter: state.counter + amount };
//   //   }
//   // },
//   defaultState
// )

import { createAction, handleAction } from "redux-actions"

const defaultState = { user: null }

const { getUser } = createAction("GET_USER", user => ({ ...user }))

const reducer = handleAction(
  "GET_USER",
  (state, action) => ({ user: action.payload }),
  defaultState
)

export default reducer
