import getOr from 'lodash/fp/getOr'

export const getError = getOr('', ['incomingProject', 'error'])

export const getProjectData = getOr({}, ['incomingProject'])
