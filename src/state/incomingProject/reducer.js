import * as C from './constants'

const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    case C.ADD_INCOMING_PROJECT: {
      const { repoLink, repoProvider } = action.payload
      return {
        repoLink,
        repoProvider,
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
