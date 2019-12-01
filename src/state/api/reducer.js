import { REHYDRATE } from 'redux-persist'
import * as C from './constants'

const initialState = {
  user: { data: {} },
  sendEmail: null,
  myProjects: { data: [] },
  subscription: { data: {} },
}

export default (state = initialState, action) => {
  switch (action.type) {
    case C.FETCH_START: {
      const { payload: { storeKey } = {} } = action

      return {
        ...state,
        [storeKey]: {
          ...(state[storeKey] || {}),
          isLoading: true,
          error: undefined,
          message: undefined,
          code: undefined,
        },
      }
    }

    /*
      Append data to array, extend object, add primitive. For example given
      the following initial state: myProjects: { data: [] } and action:
      { type: 'FETCH_SUCCESS',
        storeKey: 'myProjects',
        data: { id: 123, githubLink: 'https://github.com/stroveio/stroveio-client'}
      } we get the following state:
      {
        api: {
          myProjects: [
            { id: 123, githubLink: 'https://github.com/stroveio/stroveio-client'}
          ]
        }
      }
    */
    case C.FETCH_SUCCESS: {
      const { payload: { storeKey, data, code, message } = {} } = action
      /*
        Default, opinionated behavior for reducers
        If old data was an array and one one isn't, append new data to array (for example
        when adding additional project to projects)
        If old data was an object extend object with new props (for example when user is already
        logged in but more user data has been fetched)
        For old data being an array or primitive and new data coming in array or primitive overwrite
        old data with a new one (for example when re-fetching projects
      */

      let newData
      if (Array.isArray(state[storeKey].data) && !Array.isArray(data)) {
        newData = [...state[storeKey].data, data]
      } else if (
        !Array.isArray(state[storeKey].data) &&
        typeof state[storeKey].data === 'object'
      ) {
        newData = { ...state[storeKey].data, ...data }
      } else {
        newData = data
      }

      return {
        ...state,
        [storeKey]: {
          ...(state[storeKey] || {}),
          data: newData,
          isLoading: false,
          error: undefined,
          message,
          code,
        },
      }
    }

    case C.FETCH_ERROR: {
      const { payload: { storeKey, error, message, code } = {} } = action
      return {
        ...state,
        [storeKey]: {
          ...(state[storeKey] || {}),
          isLoading: false,
          error,
          message,
          code,
        },
      }
    }

    /* Remove item from array, clear data from object, remove primitives */
    case C.REMOVE_ITEM: {
      const { payload: { storeKey, id } = {} } = action

      return {
        ...state,
        [storeKey]: {
          ...(state[storeKey] || {}),
          data: Array.isArray(state[storeKey].data)
            ? state[storeKey].data.filter(item => item.id !== id)
            : typeof state[storeKey].data === 'object'
            ? {}
            : null,
        },
      }
    }

    /*
      Id is needed to update arrays.
      UPDATE_ITEM handler works a lot like FETCH_SUCCESS case but allows updating perticular items,
      It's also easier to express changes in state when both FETCH_SUCCESS and UPDATE_ITEM
      actions are dispatched depending on use case.
    */
    case C.UPDATE_ITEM: {
      const { payload: { storeKey, id, data, message, code } = {} } = action

      let newData
      if (Array.isArray(state[storeKey].data) && typeof data === 'object') {
        newData = state[storeKey].data.map(item =>
          item.id !== id ? item : { ...item, ...data }
        )
      } else if (Array.isArray(state[storeKey].data)) {
        newData = state[storeKey].data.map(item => (item !== id ? item : data))
      } else if (typeof state[storeKey].data === 'object') {
        newData = { ...state[storeKey].data, ...data }
      } else {
        newData = data
      }

      return {
        ...state,
        [storeKey]: {
          ...(state[storeKey] || {}),
          data: newData,
          isLoading: false,
          error: undefined,
          message,
          code,
        },
      }
    }

    case REHYDRATE: {
      const { payload } = action
      // Payload is null or undefined
      if (!Boolean(payload)) {
        return initialState
      }
      let newState = {}
      Object.keys(payload).forEach(storeKey => {
        newState = {
          ...newState,
          [storeKey]: {
            ...payload[storeKey],
            /* Do not store currentProjectId */
            currentProjectId: undefined,
            isLoading: false,
            error: undefined,
          },
        }
      })
      return newState
    }

    default:
      return state
  }
}
