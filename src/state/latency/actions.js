import * as C from './constants'

export const latencyMeasureStart = payload => ({
  type: C.LATENCY_MEASURE_START,
  payload,
})

export const latencyMeasureEnd = payload => ({
  type: C.LATENCY_MEASURE_END,
  payload,
})
