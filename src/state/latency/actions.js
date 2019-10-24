import * as C from './constants'

export const addIncomingProject = payload => ({
  type: C.LATENCY_MEASURE_START,
  payload,
})

export const catchIncomingError = payload => ({
  type: C.LATENCY_MEASURE_END,
  payload,
})
