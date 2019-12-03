import * as C from './constants'

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
      return {
        ...state,
        isBeingAdded: true,
      }
    }

    case C.SET_PROJECT_IS_BEING_STARTED: {
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

    default:
      return state
  }
}
