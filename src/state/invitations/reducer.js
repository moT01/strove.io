import * as C from './consts'

const initialState = null

export default (state = initialState, action) => {
  switch (action.type) {
    case C.ADD_INCOMING_ACCEPT: {
      const { teamId, teamName } = action.payload
      return {
        ...state,
        teamId,
        teamName,
      }
    }
    case C.REMOVE_INCOMING_ACCEPT: {
      return initialState
    }

    case C.CATCH_INCOMING_ACCEPT_ERROR: {
      const { error } = action.payload
      return { error }
    }
    default:
      return state
  }
}
