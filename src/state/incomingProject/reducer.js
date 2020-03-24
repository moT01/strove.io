import * as C from './consts'
import { REHYDRATE } from 'redux-persist'

const initialState = null

export default (state = initialState, action) => {
  switch (action.type) {
    case C.ADD_INCOMING_PROJECT: {
      const { repoLink, repoProvider } = action.payload
      return {
        ...state,
        repoLink,
        repoProvider,
      }
    }

    case C.SET_PROJECT_IS_BEING_ADDED: {
      const { isLiveshare } = action
      return {
        ...state,
        isBeingAdded: true,
        isLiveshare,
      }
    }

    case C.SET_PROJECT_IS_BEING_STARTED: {
      const { isLiveshare } = action
      return {
        ...state,
        isBeingStarted: true,
      }
    }

    case C.REMOVE_INCOMING_PROJECT: {
      return initialState
    }

    case C.CATCH_INCOMING_ERROR: {
      const { error } = action.payload
      return { error }
    }

    case REHYDRATE: {
      return {
        ...state,
        isLiveshare: false,
        isBeingAdded: false,
        isBeingStarted: false,
      }
    }

    default:
      return state
  }
}
