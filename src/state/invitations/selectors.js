import getOr from 'lodash/fp/getOr'

export const invitedByTeamId = getOr(false, ['invitations', 'teamId'])

export const getError = getOr('', ['incomingAccept', 'error'])
