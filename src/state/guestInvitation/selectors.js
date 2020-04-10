import getOr from 'lodash/fp/getOr'

export const isGuest = getOr(false, ['guestInvitation', 'isGuest'])

export const guestId = getOr(false, ['guestInvitation', 'guestId'])
