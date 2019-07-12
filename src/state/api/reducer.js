import { handleActions } from 'redux-actions'
import * as C from './constants'

const initialState = {
  user: null,
  myProjects: { data: [] },
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
    /*
      Append data to array, extend object, add primitive. For example given
      the following initial state: myProjects: { data: [] } and action:
      { type: 'FETCH_SUCCESS',
        storeKey: 'myProjects',
        data: { id: 123, githubLink: 'https://github.com/codengo-llc/silisky-client'}
      } we get the following state:
      {
        api: {
          myProjects: [
            { id: 123, githubLink: 'https://github.com/codengo-llc/silisky-client'}
          ]
        }
      }
    */
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
