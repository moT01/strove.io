import getOr from 'lodash/fp/getOr'

export const isEmbedded = getOr(null, ['displayEmbedded'])
