import * as C from './consts'

const initialState = null

export default (state = initialState, { payload, type }) => {
  switch (type) {
    case C.LATENCY_MEASURE_START: {
      return {
        ...state,
        timeStart: payload,
      }
    }

    case C.LATENCY_MEASURE_END: {
      return {
        ...state,
        latency: Math.round(payload - state.timeStart),
      }
    }

    case C.FULL_LATENCY_MEASUREMENT: {
      return {
        ...state,
        latency: Math.round(payload),
      }
    }

    default:
      return state
  }
}
