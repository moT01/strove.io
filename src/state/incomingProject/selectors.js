import getOr from 'lodash/fp/getOr'

export const getError = getOr('', ['incomingProject', 'error'])

export const isIncoming = getOr(null, ['incomingProject'])

export const getRepoLink = getOr(null, ['incomingProject', 'repoLink'])

export const getRepoName = getOr(null, ['incomingProject', 'name'])

export const isProjectBeingStarted = getOr(false, [
  'incomingProject',
  'isBeingStarted',
])

export const isProjectBeingAdded = getOr(false, [
  'incomingProject',
  'isBeingAdded',
])
