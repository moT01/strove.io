import * as C from './consts'

export const latencyMeasureStart = payload => ({
  type: C.LATENCY_MEASURE_START,
  payload,
})

export const latencyMeasureEnd = payload => ({
  type: C.LATENCY_MEASURE_END,
  payload,
})
