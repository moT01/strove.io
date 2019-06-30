import { handleActions } from 'redux-actions'
import * as C from './constants'

const initialState = {
  user: {},
  myProjects: { data: [] },
}

// action = { type: 'SELECT_PROJECT', payload: {} }
//reducer.LOGOUT(previousState, action)
export default handleActions(
  {
    [C.FETCH_START]: (state, { payload: { storeKey } = {} }) => ({
      ...state,
      [storeKey]: {
        ...(state[storeKey] || {}),
        isLoading: true,
        error: undefined,
        message: undefined,
        code: undefined,
      },
    }),
    /* Append data to array, extend object, add primitive */
    [C.FETCH_SUCCESS]: (
      state,
      { payload: { storeKey, data, code, message } = {} }
    ) => ({
      ...state,
      [storeKey]: {
        ...(state[storeKey] || {}),
        data: Array.isArray(state[storeKey].data)
          ? [...data]
          : typeof state[storeKey].data === 'object'
          ? { ...state[storeKey].data, ...data }
          : data,
        isLoading: false,
        error: undefined,
        message,
        code,
      },
    }),
    [C.FETCH_ERROR]: (
      state,
      { payload: { storeKey, error, message, code } = {} }
    ) => ({
      ...state,
      [storeKey]: {
        ...(state[storeKey] || {}),
        isLoading: false,
        error,
        message,
        code,
      },
    }),
    /* Remove item from array, clear data from object, remove primitives */
    [C.REMOVE_ITEM]: (state, { payload: { storeKey, id } = {} }) => ({
      ...state,
      [storeKey]: {
        ...(state[storeKey] || {}),
        data: Array.isArray(state[storeKey].data)
          ? state[storeKey].data.filter(item => item.id !== id)
          : typeof state[storeKey].data === 'object'
          ? {}
          : null,
      },
    }),
    LOGOUT: () => initialState,
  },
  initialState
)
