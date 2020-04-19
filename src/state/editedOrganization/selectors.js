import getOr from 'lodash/fp/getOr'

import { getMyOrganizations } from '../api/selectors'

export const getEditedOrganization = state =>
  getOr(null, ['editedOrganization', 'organization'])(state) ||
  getMyOrganizations(state)

export const getEditedTeam = getOr(null, ['editedOrganization', 'team'])
