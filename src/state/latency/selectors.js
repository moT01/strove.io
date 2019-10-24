import getOr from 'lodash/fp/getOr'

export const getLatency = getOr(null, ['latency', 'latency'])
