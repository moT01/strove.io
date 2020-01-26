import getOr from 'lodash/fp/getOr'

export const getError = getOr('', ['incomingAccept', 'error'])
