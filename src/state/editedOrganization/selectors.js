import getOr from 'lodash/fp/getOr'

export const getEditedOrganization = getOr(null, [
  'editedOrganization',
  'organization',
])

export const getEditedTeam = getOr(null, ['editedOrganization', 'team'])
