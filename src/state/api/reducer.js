import { handleActions } from 'redux-actions'
import * as C from './constants'

export default handleActions(
  {
    [C.FETCH_START]: (state, { payload: { name } = {} }) => ({
      ...state,
      [name]: {
        ...(state[name] || {}),
        isLoading: true,
        error: undefined,
        message: undefined,
        code: undefined,
      },
    }),
    [C.FETCH_SUCCESS]: (
      state,
      { payload: { name, data, code, message } = {} }
    ) => ({
      ...state,
      [name]: {
        ...(state[name] || {}),
        data: Array.isArray(data)
          ? [...data]
          : typeof data === 'object'
          ? { ...state[name].data, ...data }
          : data,
        isLoading: false,
        error: undefined,
        message,
        code,
      },
    }),
    [C.FETCH_ERROR]: (
      state,
      { payload: { name, error, message, code } = {} }
    ) => ({
      ...state,
      [name]: {
        ...(state[name] || {}),
        isLoading: false,
        error,
        message,
        code,
      },
    }),
    LOGOUT: () => undefined,
  },
  {
    user: {
      isLoading: false,
      data: undefined,
      error: undefined,
      message: undefined,
      code: undefined,
    },
  }
)
