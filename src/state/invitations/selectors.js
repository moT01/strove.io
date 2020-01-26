import getOr from 'lodash/fp/getOr'

export const invitationId = getOr(false, ['invitations', 'teamId'])

export const getError = getOr('', ['incomingAccept', 'error'])
