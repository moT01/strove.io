import getOr from 'lodash/fp/getOr'

import { getOwnedOrganizations } from '../api/selectors'

export const getEditedOrganization = state =>
  getOr(null, ['editedOrganization', 'organization'])(state) ||
  getOwnedOrganizations(state)?.[0]

export const getEditedTeam = state =>
  getOr(null, ['editedOrganization', 'team'])(state)  || getOwnedOrganizations(state)[0]?.teams?.[0]
