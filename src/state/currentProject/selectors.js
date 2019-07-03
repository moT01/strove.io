import getOr from 'lodash/fp/getOr'

export const getProjectData = getOr('', ['currentProject'])
