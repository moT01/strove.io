import getOr from 'lodash/fp/getOr'

import { getOwnedOrganizations, getMyTeams } from '../api/selectors'

export const getEditedOrganization = state =>
  getOr(null, ['editedOrganization', 'organization'])(state) ||
  getOwnedOrganizations(state)[0]

export const getEditedTeam = state =>
  getOr(null, ['editedOrganization', 'team'])(state) || getMyTeams(state)[0]
