import * as C from './constants'

const initialState = false

export default (state = initialState, action) => {
  switch (action.type) {
    case C.DISPLAY_EMBEDDED: {
      return true
    }

    default:
      return state
  }
}
