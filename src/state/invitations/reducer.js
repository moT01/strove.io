import * as C from './consts'

const initialState = null

export default (state = initialState, action) => {
  switch (action.type) {
    case C.ADD_INVITATION: {
      const { teamId, teamName } = action.payload
      return {
        ...state,
        teamId,
        teamName,
      }
    }
    case C.ACCEPT_INVITATION: {
      return initialState
    }

    default:
      return state
  }
}
