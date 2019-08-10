import getOr from 'lodash/fp/getOr'

export const getError = getOr('', ['incomingProject', 'error'])

export const getProjectData = getOr(null, ['incomingProject'])

export const getRepoLink = getOr(null, ['incomingProject', 'repoLink'])
