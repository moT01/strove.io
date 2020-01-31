import * as C from './consts'

const initialState = null

export default (state = initialState, action) => {
  switch (action.type) {
    case C.LATENCY_MEASURE_START: {
      return {
        ...state,
        timeStart: action.payload,
      }
    }

    case C.LATENCY_MEASURE_END: {
      return {
        ...state,
        latency: action.payload - state.timeStart,
      }
    }

    case C.FULL_LATENCY_MEASUREMENT: {
      return {
        ...state,
        latency: action.payload,
      }
    }

    default:
      return state
  }
}
