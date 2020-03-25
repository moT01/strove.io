import * as C from './consts'

const initialState = null

export default (state = initialState, action) => {
  switch (action.type) {
    case C.SET_CURRENT_PROJECT: {
      const { data } = action
      return {
        data,
      }
    }

    case C.RESET_CURRENT_PROJECT: {
      return state
    }

    default:
      return state
  }
}
