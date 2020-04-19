import getOr from 'lodash/fp/getOr'

import { getOwnedOrganizations } from '../api/selectors'

export const getEditedOrganization = state =>
  getOr(null, ['editedOrganization', 'organization'])(state) ||
  getOwnedOrganizations(state)[0]

export const getEditedTeam = getOr(null, ['editedOrganization', 'team'])
