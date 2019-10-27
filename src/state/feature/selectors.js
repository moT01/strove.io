import getOr from 'lodash/fp/getOr'

export const getFeature = getOr(null, ['feature'])
