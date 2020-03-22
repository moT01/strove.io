import * as C from './consts'

const initialState = null

export default (state = initialState, action) => {
  switch (action.type) {
    case C.SET_EDITED_ORGANIZATION: {
      const { organization, team } = action.payload
      return {
        organization,
        team,
      }
    }

    case C.RESET_EDITED_ORGANIZATION: {
      return state
    }

    default:
      return state
  }
}
