import { handleActions } from 'redux-actions'
import * as C from './constants'

const initialState = {
  user: {},
}

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
    [C.FETCH_SUCCESS]: (
      state,
      { payload: { storeKey, data, code, message } = {} }
    ) => ({
      ...state,
      [storeKey]: {
        ...(state[storeKey] || {}),
        data: Array.isArray(data)
          ? [...data]
          : typeof data === 'object'
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
    LOGOUT: () => initialState,
  },
  initialState
)
