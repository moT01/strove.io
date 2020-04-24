import * as C from './consts'

const initialState = null

export default (state = initialState, action) => {
  switch (action.type) {
    case C.ADD_GUEST_INVITATION: {
      const { isGuest, guestId } = action.payload
      return {
        ...state,
        isGuest,
        guestId,
      }
    }

    default:
      return state
  }
}
