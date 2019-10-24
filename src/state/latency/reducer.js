import * as C from './constants'

const initialState = null

export default (state = initialState, action) => {
  switch (action.type) {
    case C.LATENCY_MEASURE_START: {
      const { timeStart } = action.payload
      return {
        ...state,
        timeStart,
      }
    }

    case C.LATENCY_MEASURE_END: {
      const { timeEnd } = action.payload
      return {
        ...state,
        latency: timeEnd - timeStart,
      }
    }

    default:
      return state
  }
}
